import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Header from './components/Header';
import apiService from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await apiService.createTask(taskData);
      setTasks([...tasks, newTask]);
      setIsFormOpen(false);
      setCurrentTask(null);
    } catch (err) {
      setError('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await apiService.updateTask(id, taskData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setIsFormOpen(false);
      setCurrentTask(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  const handleMarkCompleted = async (id) => {
    try {
      const updatedTask = await apiService.markTaskCompleted(id);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError('Failed to mark task as completed. Please try again.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await apiService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    }
  };

  const openEditForm = (task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <div className="task-container">
          <div className="task-header">
            <h2>My Tasks</h2>
            <button 
              onClick={() => { setIsFormOpen(true); setCurrentTask(null); }}
              className="btn btn-primary"
            >
              Add New Task
            </button>
          </div>
          
          {error && (
            <div className="error-message" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {isLoading ? (
            <div className="loading-message">
              <p>Loading tasks...</p>
            </div>
          ) : (
            <TaskList 
              tasks={tasks} 
              onMarkCompleted={handleMarkCompleted}
              onEdit={openEditForm}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
        
        {isFormOpen && (
          <TaskForm 
            onClose={() => { setIsFormOpen(false); setCurrentTask(null); }}
            onSubmit={currentTask ? (data) => handleUpdateTask(currentTask.id, data) : handleCreateTask}
            initialData={currentTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;