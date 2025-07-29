import React from 'react';
import webjamzLogo from '../assets/WebJAMZ Logo.png';
import taskarooLogo from '../assets/Taskaroo Logo.png';

function Navbar({ setPage, handleLogout, currentPage, user }) {
  return (
    <nav className="navbar">
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}
        className="logo-navbar"
      >
        <img src={taskarooLogo} alt="Taskaroo" width={100} />
      </a>
      
      <div className="navbar-links">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}
          className={currentPage === 'dashboard' ? 'active' : ''}
        >
          Dashboard
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setPage('tasks'); }}
          className={currentPage === 'tasks' ? 'active' : ''}
        >
          Tasks
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setPage('habits'); }}
          className={currentPage === 'habits' ? 'active' : ''}
        >
          Habits
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleLogout(); }}
        >
          Logout
        </a>
      </div>
    </nav>
  );
}

export default Navbar;