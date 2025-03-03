import React, { useState, useEffect } from 'react';
import './TaskForm.css';

function TaskForm({ onSubmit, onClose, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assigned_to: '',
    status: 'pending'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        assigned_to: initialData.assigned_to || '',
        status: initialData.status || 'pending'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{initialData ? 'Edit Task' : 'Create New Task'}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="form-control"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="assigned_to">Assigned To</label>
            <input
              type="text"
              id="assigned_to"
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          {initialData && (
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
          
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-submit"
            >
              {initialData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;