import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [duration, setDuration] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [error, setError] = useState(""); 

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async (event) => {
    event.preventDefault();
    setError("");
     if (!title.trim()) {
    alert("Please enter a task title.");
     return;
    }

    if (!duration || Number(duration) < 1) {
    alert("Duration must be at least 1 minute.");
     return;
    }

   if (!deadline) {
   alert("Please select a deadline.");
    return;
   }

  const taskData = {
      title,
      priority,
      duration: Number(duration),
      deadline
    };

    if (editingTaskId !== null) {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${editingTaskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(taskData)
        }
      );

      if (!response.ok) {
       setError("Failed to update task. Please check your input.");
       return;
    }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTaskId ? updatedTask : task
        )
      );

      setEditingTaskId(null);
    } else
      {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) {
    setError("Failed to add task. Please check your input.");
    return;
  }

  const savedTask = await response.json();

      setTasks((currentTasks) => [...currentTasks, savedTask]);
    }

    setTitle("");
    setPriority("MEDIUM");
    setDuration("");
    setDeadline("");
  };

  const deleteTask = async (id) => {

    const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) {
    return;
  }
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE"
    });

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const generateSchedule = async () => {
    const response = await fetch(
      "http://localhost:8080/api/tasks/schedule"
    );

    const data = await response.json();

    setScheduledTasks(data);
  };

  return (
    <div
    style={{
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px"
  }}>
      <h1>Smart Task Scheduler</h1>
      <h2>Add a Task</h2>
{error && (
  <p style={{ color: "#dc2626", fontWeight: "500" }}>
    {error}
  </p>
)}
      <form onSubmit={addTask}   style={{
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    marginBottom: "25px"
  }}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LOW">LOW</option>
        </select>

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />

        <input
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
        />

        <button type="submit">
          {editingTaskId !== null ? "Update Task" : "Add Task"} </button>
     
{editingTaskId !== null && (
  <button
    type="button"
    onClick={() => {
      setEditingTaskId(null);
      setTitle("");
      setPriority("MEDIUM");
      setDuration("");
      setDeadline("");
    }}
  >Cancel</button>
)}
    
 </form>

      <h2>Tasks ({tasks.length})</h2>

      <button onClick={generateSchedule}>
        Generate Schedule
      </button>

{tasks.length === 0 && (
  <p>No tasks added yet. Create your first task above.</p>
)}
      {tasks.map((task) => (
        <div key={task.id}
        style={{
      background: "white",
      padding: "15px",
      margin: "10px 0",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
    }}>
          <h3>{task.title}</h3>

          <p>
           <strong>{task.priority} </strong>
          </p>
          <p>
            <strong>{task.duration} minutes</strong>
          </p>
          <p>
            <strong> {task.deadline}</strong>
          </p>

          <button
            onClick={() => {
              setEditingTaskId(task.id);
              setTitle(task.title);
              setPriority(task.priority);
              setDuration(task.duration);
              setDeadline(task.deadline);
            }}
          >Edit</button>
          <button onClick={() => deleteTask(task.id)}   style={{
    background: "#dc2626"
  }}>Delete</button>
        </div>
      ))}

      <h2>📅 Scheduled Tasks</h2>
      {scheduledTasks.length > 0 && (
  <p>
    {scheduledTasks.length} task{scheduledTasks.length !== 1 ? "s" : ""} scheduled
  </p>
)}

      {scheduledTasks.map((task, index) => (
        <div key={task.id}
        style={{
    background: "white",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
  }}>
          <p>
  <strong>#{index + 1}</strong> — {task.title}
</p>

<p>
  <strong>Priority:</strong> {""}
   <span
    style={{
      fontWeight: "bold",
      padding: "4px 8px",
      borderRadius: "4px",
      background:
        task.priority === "HIGH"
          ? "#fee2e2"
          : task.priority === "MEDIUM"
          ? "#fef3c7"
          : "#dcfce7"
    }}
  > {task.priority} </span>
</p>

<p>
  <strong>Duration:</strong> {task.duration} minutes
</p>

<p>
  <strong>Deadline:</strong> {task.deadline}
</p>
        </div>
      ))}
    </div>
  );
}

export default App;