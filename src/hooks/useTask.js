import { useState, useCallback } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = useCallback((title) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), title, completed: false },
    ]);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return { tasks, setTasks, addTask, deleteTask, toggleTask };
};
