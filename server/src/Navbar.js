import React from 'react';
import taskaroologo from './assets/taskaroologo.png';

function Navbar({ setPage, handleLogout, currentPage }) {
  return (
    <div className="navbar-box">
      {/* Top section: Logo on left, centered title */}
      <div className="navbar-top">
        {/* Logo on top left */}
        <div className="navbar-top-left">
          <img src={taskaroologo} alt="Taskaroo Logo" className="logo-taskaroo" />
        </div>
        {/* Centered title */}
        <div className="navbar-top-center">
          <h1 className="navbar-title">Task & Habit Tracker</h1>
        </div>
      </div>
      {/* Menu buttons beneath */}
      <div className="navbar-menu">
        <button
          onClick={() => setPage('dashboard')}
          className={currentPage === 'dashboard' ? 'tab active' : 'tab'}
        >
          Dashboard
        </button>
        <button
          onClick={() => setPage('tasks')}
          className={currentPage === 'tasks' ? 'tab active' : 'tab'}
        >
          Task
        </button>
        <button
          onClick={() => setPage('habits')}
          className={currentPage === 'habits' ? 'tab active' : 'tab'}
        >
          Habits
        </button>
        <button onClick={handleLogout} className="tab">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
