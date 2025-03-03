import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const apiService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { task: taskData });
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Update a task
  updateTask: async (id, taskData) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, { task: taskData });
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  // Mark a task as completed
  markTaskCompleted: async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}/mark_completed`);
      return response.data;
    } catch (error) {
      console.error(`Error marking task ${id} as completed:`, error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  }
};

export default apiService;