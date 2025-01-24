import React, { useState, useEffect, useRef } from "react";
import "./ToDo.css";

type ToDoProps = {
  tasks: {
    id: number;
    text: string;
    completed: boolean;
  }[];
  addTask: (taskText: string) => void;
  handleDeleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
};

export default function ToDo({
  tasks,
  addTask,
  handleDeleteTask,
  toggleTask,
}: ToDoProps) {
  const [newTaskText, setNewTaskText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText);
      setNewTaskText("");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [tasks]);

  return (
    <div className="todoSection">
      <h2 className="todoTitle">To-Do List</h2>
      <div className="todoListContainer" ref={inputRef}>
        <ul className="todoList">
          {tasks.length === 0 ? (
            <p className="noTasks">Be productive! Add your tasks for today.</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className={`todoItem ${task.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.text}</span>
                <button
                  className="removeTaskButton"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  x
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      <form className="addTaskForm" onSubmit={handleAddTask}>
        <input
          className="addTaskInput"
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button className="addTaskButton" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}
