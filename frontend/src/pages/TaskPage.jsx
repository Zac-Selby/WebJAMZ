import React, { useState, useEffect } from 'react';
import { taskAPI } from '../utils/api';

function TaskPage({ user }) {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium'); // Changed to match backend enum

  // Load tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskAPI.getTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setError(data.message || 'Failed to load tasks');
      }
    } catch (err) {
      setError('Error loading tasks: ' + err.message);
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const handleAddTask = async () => {
    if (!taskName.trim()) {
      setError('Task name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const newTask = await taskAPI.createTask({
        title: taskName,
        dueDate: dueDate,
        priority: priority
      });
      
      if (newTask._id) {
        setTasks([...tasks, newTask]);
        setTaskName('');
        setDueDate('');
        setPriority('Medium'); // Changed to match backend enum
      } else {
        setError(newTask.message || 'Failed to create task');
      }
    } catch (err) {
      setError('Error creating task: ' + err.message);
      console.error('Error creating task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Complete task (just show alert for now)
  const handleComplete = async (task) => {
    if (task.isComplete) {
      alert('Task is already completed!');
      return;
    }

    try {
      setLoading(true);
      const updatedTask = await taskAPI.completeTask(task._id);
      if (updatedTask._id) {
        setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
        alert(`Task completed: ${task.title} ✅`);
      } else {
        setError(updatedTask.message || 'Failed to complete task');
      }
    } catch (err) {
      setError('Error completing task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit task (simple update)
  const handleEdit = async (task) => {
    const newTitle = prompt('Enter new task title:', task.title);
    if (newTitle && newTitle !== task.title) {
      try {
        setLoading(true);
        const updatedTask = await taskAPI.updateTask(task._id, { title: newTitle });
        if (updatedTask._id) {
          setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
        } else {
          setError(updatedTask.message || 'Failed to update task');
        }
      } catch (err) {
        setError('Error updating task: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setLoading(true);
        const result = await taskAPI.deleteTask(taskId);
        if (result.message) {
          setTasks(tasks.filter(task => task._id !== taskId));
        } else {
          setError('Failed to delete task');
        }
      } catch (err) {
        setError('Error deleting task: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="page-box">
      <h1 className="page-title">Task List</h1>
      
      {/* Show user info */}
      {user && <p>Welcome, {user.name}!</p>}
      
      {/* Error Display */}
      {error && <div style={{color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '5px'}}>{error}</div>}
      
      {/* Loading indicator */}
      {loading && <div style={{color: 'blue', marginBottom: '10px'}}>Loading...</div>}

      {/* Add Task Form */}
      <div className="section-box">
        <h3>Add New Task</h3>
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button 
          style={{ marginTop: '10px' }} 
          className="primary" 
          onClick={handleAddTask}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>

      {/* Task List */}
      <div style={{ marginTop: '20px' }}>
        <h3>My Tasks ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <p>No tasks added yet. Create your first task above!</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-item-box" style={{ 
              marginBottom: '10px', 
              padding: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              backgroundColor: task.isComplete ? '#d4edda' : '#f9f9f9',
              opacity: task.isComplete ? 0.8 : 1
            }}>
              <div>
                <strong style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
                  {task.isComplete ? '✅ ' : ''}{task.title}
                </strong>
                {task.dueDate && <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
                <div>Priority: <span style={{color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'}}>{task.priority}</span></div>
                <div>Status: <span style={{color: task.isComplete ? 'green' : 'orange', fontWeight: 'bold'}}>{task.isComplete ? 'Completed' : 'Pending'}</span></div>
                <div style={{fontSize: '0.9em', color: '#666'}}>Created: {new Date(task.createdAt).toLocaleDateString()}</div>
                {task.isComplete && (
                  <div style={{fontSize: '0.9em', color: 'green'}}>Completed: {new Date(task.updatedAt).toLocaleDateString()}</div>
                )}
              </div>
              <div className="task-buttons" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  className={task.isComplete ? "secondary" : "primary"} 
                  onClick={() => handleComplete(task)}
                  disabled={loading || task.isComplete}
                  style={{backgroundColor: task.isComplete ? '#6c757d' : '#28a745'}}
                >
                  {task.isComplete ? 'Completed ✅' : 'Complete'}
                </button>
                <button className="secondary" onClick={() => handleEdit(task)}>Edit</button>
                <button className="secondary" onClick={() => handleDelete(task._id)} disabled={loading}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskPage;