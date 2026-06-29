import React from 'react';

export default function TaskList({ tasks, updateTask, deleteTask }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one!</p>;
  }

  return (
    <ul className='task-list'>
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`${task.completed ? "completed" : ""} ${task.priority}`}
        >
          <div>
            <span>
              {task.text}
              <small>
                ({task.priority}, {task.category})
              </small>
            </span>
          </div>

          <div>
            <button onClick={() => updateTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}