import Header from "./components/Header/Header";
import Chat from "./components/Chat/Chat";
import "./App.css";
import { useState } from "react";
import ToDo from "./components/ToDo/ToDo";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
      return updatedTasks;
    });
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
      return updatedTasks;
    });
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks
        .map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
        .sort((a, b) => {
          if (a.completed === b.completed) return 0;
          return a.completed ? 1 : -1; // Move completed tasks to the end
        });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
      return updatedTasks;
    });
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <Chat addTask={addTask} />
        <ToDo
          tasks={tasks}
          addTask={addTask}
          handleDeleteTask={handleDeleteTask}
          toggleTask={toggleTask}
        />
      </main>
    </div>
  );
}
