import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTasks } from "./hooks/useTask";
import { TasksContext } from "./context/taskContext";
import { TaskList, TaskFilter, AddTask } from "./components/task";
import { KonamiEasterEgg } from "./components/konamiCode";
import "./App.css";

const App = () => {
  const { tasks, addTask, deleteTask, toggleTask, setTasks } = useTasks();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, [setTasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "active":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleAddTask = useCallback(
    (title) => {
      addTask(title);
    },
    [addTask]
  );

  const handleDeleteTask = useCallback(
    (id) => {
      deleteTask(id);
    },
    [deleteTask]
  );

  const handleToggleTask = useCallback(
    (id) => {
      toggleTask(id);
    },
    [toggleTask]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks: filteredTasks,
        addTask: handleAddTask,
        deleteTask: handleDeleteTask,
        toggleTask: handleToggleTask,
      }}
    >
      <div className="container">
        <h1>Awesome Todo List</h1>
        <AddTask />
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList />
        <KonamiEasterEgg />
      </div>
    </TasksContext.Provider>
  );
};

export default App;
