import React, { useState, useEffect } from 'react';
import { habitAPI } from '../utils/api';

function HabitPage({ user }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState('Daily'); // Changed to match backend enum

  // Load habits when component mounts
  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await habitAPI.getHabits();
      if (Array.isArray(data)) {
        setHabits(data);
      } else {
        setError(data.message || 'Failed to load habits');
      }
    } catch (err) {
      setError('Error loading habits: ' + err.message);
      console.error('Error loading habits:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new habit
  const handleAddHabit = async () => {
    if (!habitName.trim()) {
      setError('Habit name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const newHabit = await habitAPI.createHabit({
        name: habitName,
        frequency: frequency
      });
      
      if (newHabit._id) {
        setHabits([...habits, newHabit]);
        setHabitName('');
        setFrequency('Daily'); // Changed to match backend enum
      } else {
        setError(newHabit.message || 'Failed to create habit');
      }
    } catch (err) {
      setError('Error creating habit: ' + err.message);
      console.error('Error creating habit:', err);
    } finally {
      setLoading(false);
    }
  };

  // Complete habit
  const handleComplete = async (habit) => {
    try {
      setLoading(true);
      const result = await habitAPI.completeHabit(habit._id);
      if (result.message) {
        alert(`Habit completed: ${habit.name}! ${result.message}`);
        // Reload habits to get updated streak info
        loadHabits();
      } else {
        setError(result.message || 'Failed to complete habit');
      }
    } catch (err) {
      setError('Error completing habit: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit habit
  const handleEdit = async (habit) => {
    const newName = prompt('Enter new habit name:', habit.name);
    if (newName && newName !== habit.name) {
      try {
        setLoading(true);
        const updatedHabit = await habitAPI.updateHabit(habit._id, { name: newName });
        if (updatedHabit._id) {
          setHabits(habits.map(h => h._id === habit._id ? updatedHabit : h));
        } else {
          setError(updatedHabit.message || 'Failed to update habit');
        }
      } catch (err) {
        setError('Error updating habit: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete habit
  const handleDelete = async (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        setLoading(true);
        const result = await habitAPI.deleteHabit(habitId);
        if (result.message) {
          setHabits(habits.filter(habit => habit._id !== habitId));
        } else {
          setError('Failed to delete habit');
        }
      } catch (err) {
        setError('Error deleting habit: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="page-box">
      <h1 className="page-title">Habit List</h1>
      
      {/* Show user info */}
      {user && <p>Welcome, {user.name}!</p>}
      
      {/* Error Display */}
      {error && <div style={{color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '5px'}}>{error}</div>}
      
      {/* Loading indicator */}
      {loading && <div style={{color: 'blue', marginBottom: '10px'}}>Loading...</div>}

      {/* Add Habit Form */}
      <div className="section-box">
        <h3>Add New Habit</h3>
        <label>Habit Name</label>
        <input
          type="text"
          placeholder="Habit name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />

        <label>Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>

        <button 
          style={{ marginTop: '10px' }} 
          className="primary" 
          onClick={handleAddHabit}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Habit'}
        </button>
      </div>

      {/* Habit List */}
      <div style={{ marginTop: '20px' }}>
        <h3>My Habits ({habits.length})</h3>
        {habits.length === 0 ? (
          <p>No habits added yet. Create your first habit above!</p>
        ) : (
          habits.map((habit) => (
            <div key={habit._id} className="task-item-box" style={{ marginBottom: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <div>
                <strong>{habit.name}</strong>
                <div>Frequency: <span style={{textTransform: 'capitalize'}}>{habit.frequency}</span></div>
                <div>Current Streak: <span style={{color: 'green', fontWeight: 'bold'}}>{habit.currentStreak || 0} days</span></div>
                <div>Total Completions: {habit.completions ? habit.completions.length : 0}</div>
                <div style={{fontSize: '0.9em', color: '#666'}}>Created: {new Date(habit.createdAt).toLocaleDateString()}</div>
                {habit.completions && habit.completions.length > 0 && (
                  <div style={{fontSize: '0.9em', color: '#666'}}>
                    Last completed: {new Date(habit.completions[habit.completions.length - 1]).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="task-buttons" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  className="primary" 
                  onClick={() => handleComplete(habit)}
                  disabled={loading}
                  style={{backgroundColor: '#28a745'}}
                >
                  Complete Today
                </button>
                <button className="secondary" onClick={() => handleEdit(habit)}>Edit</button>
                <button className="secondary" onClick={() => handleDelete(habit._id)} disabled={loading}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HabitPage;
