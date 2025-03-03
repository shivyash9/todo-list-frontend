import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onMarkCompleted, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-tasks">
        <p>No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onMarkCompleted={onMarkCompleted}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;