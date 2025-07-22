import React from 'react';

function Dashboard({ setPage }) {
  return (
    <div className="page-box">
      <h1 className="page-title">Dashboard</h1>
      <div className="section-box">
        <h3>You've completed ____ tasks today</h3>
      </div>
      <div className="section-box">
        <h3>Habit Streak: X Days</h3>
      </div>
      <div className="button-group">
        <button className="primary" onClick={() => setPage('tasks')}>Add Task</button>
        <button className="primary" onClick={() => setPage('habits')}>Add Habit</button>
      </div>
    </div>
  );
}

export default Dashboard;