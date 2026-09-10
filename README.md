# Smart Task Scheduler

A full-stack task scheduling application that helps users manage tasks and generate an optimized execution order based on **priority, deadline, and duration**.

The project demonstrates practical software engineering concepts including **React, Spring Boot, REST APIs, Spring Data JPA, MySQL, CRUD operations, input validation, and greedy algorithm design**.

## Features

* Create tasks with title, priority, duration, and deadline
* View all tasks stored in MySQL
* Edit existing tasks
* Delete tasks
* Validate task inputs
* Generate a prioritized task schedule
* RESTful backend API
* React-based frontend
* Persistent database storage

## Scheduling Logic

The scheduler uses a greedy ordering strategy.

Tasks are sorted using the following criteria:

1. **Priority** — HIGH → MEDIUM → LOW
2. **Deadline** — earlier deadlines first
3. **Duration** — shorter tasks first when priority and deadline are equal

This produces a practical execution order while keeping the scheduling logic simple and explainable.

## Tech Stack

### Frontend

* React
* JavaScript
* Vite
* HTML/CSS

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Bean Validation

### Database

* MySQL

### Tools

* Maven
* Git
* GitHub

## Architecture

```text
React Frontend
      ↓
REST API
      ↓
Spring Boot
      ↓
Spring Data JPA / Hibernate
      ↓
MySQL
```

## REST API

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| GET    | `/api/tasks`          | Retrieve all tasks            |
| POST   | `/api/tasks`          | Create a task                 |
| PUT    | `/api/tasks/{id}`     | Update a task                 |
| DELETE | `/api/tasks/{id}`     | Delete a task                 |
| GET    | `/api/tasks/schedule` | Generate scheduled task order |

## Validation

The backend validates incoming task data before saving it.

Examples:

* Task title cannot be empty
* Priority is required
* Duration must be at least 1 minute
* Deadline is required
* Invalid priority values are rejected

Invalid requests return an appropriate **HTTP 400 Bad Request** response.

## Getting Started

### Prerequisites

Install:

* Java 26
* Maven
* MySQL 8+
* Node.js and npm

### 1. Clone the repository

```bash
git clone https://github.com/brijitjoy14-09/smart-task-scheduler.git
cd smart-task-scheduler
```

### 2. Create the database

Open MySQL and run:

```sql
CREATE DATABASE smart_task_scheduler;
```

### 3. Configure database credentials

The backend reads the database username and password from environment variables.

Example in PowerShell:

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="YOUR_MYSQL_PASSWORD"
```

Do not commit database passwords or other secrets to GitHub.

### 4. Start the backend

From the project root:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

### 5. Start the frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Example Workflow

```text
1. Add tasks
       ↓
2. Tasks are stored in MySQL
       ↓
3. Edit/Delete tasks when required
       ↓
4. Generate Schedule
       ↓
5. Scheduler sorts tasks by
   Priority → Deadline → Duration
       ↓
6. Optimized task order displayed
```

## What This Project Demonstrates

* Full-stack application development
* Java and Spring Boot development
* REST API design
* CRUD operations
* Database integration using JPA/Hibernate
* MySQL persistence
* React frontend development
* Client-server communication
* Input validation
* Greedy algorithm implementation
* Git and GitHub workflow

## Future Improvements

* User authentication and task ownership
* Drag-and-drop schedule adjustment
* Task completion tracking
* Calendar integration
* More advanced scheduling constraints
* Deployment to a cloud platform
