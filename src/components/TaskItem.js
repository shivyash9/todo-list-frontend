import React from 'react';
import './TaskItem.css';

function TaskItem({ task, onMarkCompleted, onEdit, onDelete }) {
  const getStatusClassName = (status) => {
    switch(status) {
      case 'pending':
        return 'status-pending';
      case 'in_progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-content">
        <div className="task-main">
          <h3 className={task.completed ? 'title-completed' : ''}>
            {task.title}
          </h3>
          <span className={`status-badge ${getStatusClassName(task.status)}`}>
            {task.status.replace('_', ' ')}
          </span>
        </div>
        <p className="task-description">{task.description}</p>
        <div className="task-details">
          {task.assigned_to && (
            <div className="task-assignee">
              <span className="label">Assigned to:</span> {task.assigned_to}
            </div>
          )}
          <div className="task-date">
            <span className="label">Created:</span> {new Date(task.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <div className="task-actions">
        {!task.completed && (
          <button 
            onClick={() => onMarkCompleted(task.id)} 
            className="btn btn-complete"
            title="Mark as completed"
          >
            Complete
          </button>
        )}
        <button 
          onClick={() => onEdit(task)} 
          className="btn btn-edit"
          title="Edit task"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task.id)} 
          className="btn btn-delete"
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;