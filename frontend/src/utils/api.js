// API utility functions for making authenticated requests
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Task API functions
export const taskAPI = {
  // Get all tasks
  getTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Create new task
  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    return response.json();
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    return response.json();
  },

  // Delete task
  deleteTask: async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Complete task
  completeTask: async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/complete`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

// Habit API functions
export const habitAPI = {
  // Get all habits
  getHabits: async () => {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Create new habit
  createHabit: async (habitData) => {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(habitData)
    });
    return response.json();
  },

  // Update habit
  updateHabit: async (habitId, habitData) => {
    const response = await fetch(`${API_BASE_URL}/habits/${habitId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(habitData)
    });
    return response.json();
  },

  // Delete habit
  deleteHabit: async (habitId) => {
    const response = await fetch(`${API_BASE_URL}/habits/${habitId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Complete habit
  completeHabit: async (habitId) => {
    const response = await fetch(`${API_BASE_URL}/habits/${habitId}/complete`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return response.json();
  }
};
