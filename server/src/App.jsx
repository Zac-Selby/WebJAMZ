import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './Navbar';          
import Login from './Login';            
import Signup from './Signup';           
import Dashboard from './Dashboard';     
import TaskPage from './TaskPage';       
import HabitPage from './HabitPage';     

import webjamzlogo from './assets/webjamzlogo.png'; 
import taskaroologo from './assets/taskaroologo.png'; 

function App() {
  // Track current page/view
  const [page, setPage] = useState('login'); // 'login', 'signup', 'dashboard', 'tasks', 'habits'
  const [isAuthenticated, setIsAuthenticated] = useState(false); // simple auth flag

  // Function to handle login (simulate login)
  const handleLogin = () => {
    setIsAuthenticated(true);
    setPage('dashboard');
  };

  // Function to handle sign up (simulate signup)
  const handleSignup = () => {
    setIsAuthenticated(true);
    setPage('dashboard');
  };

  // Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPage('login');
  };

  return (
    <div>
      {/* Always show Navbar */}
      {isAuthenticated && (
        <Navbar setPage={setPage} handleLogout={handleLogout} currentPage={page} />
      )}

      {/* Show Login Page */}
      {page === 'login' && (
        <Login switchToSignup={() => setPage('signup')} onLogin={handleLogin} /> 
      )}

      {/* Show Signup Page */}
      {page === 'signup' && (
        <Signup switchToLogin={() => setPage('login')} onSignup={handleSignup} />
      )}

      {/* Show Dashboard */}
      {isAuthenticated && page === 'dashboard' && (
        <Dashboard setPage={setPage} />
      )}

      {/* Show Task Page */}
      {isAuthenticated && page === 'tasks' && (
        <TaskPage />
      )}

      {/* Show Habit Page */}
      {isAuthenticated && page === 'habits' && (
        <HabitPage />
      )}
    </div>
  );
}


export default App
