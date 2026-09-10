package com.brijit.smart_task_scheduler;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {

        Task existingTask = taskRepository.findById(id).orElseThrow();

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setPriority(updatedTask.getPriority());
        existingTask.setDuration(updatedTask.getDuration());
        existingTask.setDeadline(updatedTask.getDeadline());

        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> generateSchedule() {

        List<Task> tasks = taskRepository.findAll();

        TaskScheduler scheduler = new TaskScheduler();

        return scheduler.generateSchedule(tasks);
    }
}