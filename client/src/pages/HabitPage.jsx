import React, { useState } from 'react';

function HabitPage() {
  const [habits, setHabits] = useState([]);

  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [date, setDate] = useState('');

  // Add new habit
  const handleAddHabit = () => {
    if (habitName.trim() && date) {
      const newHabit = {
        id: Date.now(),
        name: habitName,
        frequency: frequency,
        date: date,
      };
      setHabits([...habits, newHabit]);
      setHabitName('');
      setFrequency('Daily');
      setDate('');
    }
  };

  // Handlers for habit actions
  const handleComplete = (id) => {
    alert('Habit completed: ' + habits.find(h => h.id === id)?.name);
  };
  const handleEdit = (habit) => {
    alert('Edit habit: ' + habit.name);
  };
  const handleDelete = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="page-box">
      <h1 className="page-title">Habit List</h1>

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
          <option value="Monthly">Monthly</option>
        </select>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button style={{ marginTop: '10px' }} className="primary" onClick={handleAddHabit}>
          Add Habit
        </button>
      </div>

      {/* Habit List */}
      <div style={{ marginTop: '20px' }}>
        <h3>My Habits</h3>
        {habits.length === 0 ? (
          <p>No habits added yet.</p>
        ) : (
          habits.map((habit) => (
            <div key={habit.id} className="task-item-box" style={{ marginBottom: '10px' }}>
              <div>
                <strong>{habit.name}</strong>
                <div>Frequency: {habit.frequency}</div>
                <div>Next Date: {habit.date}</div>
              </div>
              <div className="task-buttons" style={{ display: 'flex', gap: '10px' }}>
                <button className="secondary" onClick={() => handleComplete(habit.id)}>Complete</button>
                <button className="secondary" onClick={() => handleEdit(habit)}>Edit</button>
                <button className="secondary" onClick={() => handleDelete(habit.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HabitPage;
