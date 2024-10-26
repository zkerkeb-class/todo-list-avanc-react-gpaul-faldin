import React, { useContext, useState } from "react";
import { TasksContext } from "../context/taskContext";

export const TaskList = () => {
  const { tasks, deleteTask, toggleTask } = useContext(TasksContext);

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="task-checkbox"
          />
          <span className={`task-title ${task.completed ? "completed" : ""}`}>
            {task.title}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            className="delete-task-button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="task-filters">
      <button
        onClick={() => setFilter("all")}
        className={`filter-button ${filter === "all" ? "active" : ""}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`filter-button ${filter === "active" ? "active" : ""}`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`filter-button ${filter === "completed" ? "active" : ""}`}
      >
        Completed
      </button>
    </div>
  );
};

export const AddTask = () => {
  const { addTask } = useContext(TasksContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="add-task-input"
      />
      <button type="submit" className="add-task-button">
        Add
      </button>
    </form>
  );
};
