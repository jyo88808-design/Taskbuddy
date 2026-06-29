import React, { useEffect, useState } from 'react';
import Taskform from './Components/Taskform';
import TaskList from './Components/TaskList';
import ProgressTracker from './Components/ProgressTracker';

export default function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = (task) => {
    setTasks(prev => [
      ...prev,
      { ...task, id: Date.now() }
    ]);
  };

  // Toggle complete / undo
  const updateTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(prev =>
      prev.filter(task => task.id !== id)
    );
  };

  // Clear all tasks
  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="container">   {/* 🔥 IMPORTANT FIX */}
      <h1>Task Buddy</h1>
      <p><i>Your friendly Task Manager</i></p>

      <Taskform addTask={addTask} />

      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      <ProgressTracker tasks={tasks} />

      {tasks.length > 0 && (
        <button onClick={clearTasks} className="clear-btn">
          Clear All Tasks
        </button>
      )}
    </div>
  );
}