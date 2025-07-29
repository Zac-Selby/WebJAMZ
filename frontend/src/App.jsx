import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar';        
import Login from './pages/Login.jsx';            
import Signup from './pages/Signup.jsx';           
import Dashboard from './pages/Dashboard';     
import TaskPage from './pages/TaskPage';       
import HabitPage from './pages/HabitPage';     

import webjamzlogo from './assets/WebJAMZ Logo.png'; 
import taskaroologo from './assets/Taskaroo Logo.png'; 

function App() {
  // Track current page/view
  const [page, setPage] = useState('login'); // 'login', 'signup', 'dashboard', 'tasks', 'habits'
  const [isAuthenticated, setIsAuthenticated] = useState(false); // simple auth flag
  const [user, setUser] = useState(null); // store user data

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      setPage('dashboard');
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsAuthenticated(true);
    setPage('dashboard');
  };

  // Function to handle sign up - redirect to login for now
  const handleSignup = () => {
    // After successful signup, they should login
    setPage('login');
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setPage('login');
  };

  return (
    <div>
      {/* Always show Navbar */}
      {isAuthenticated && (
        <Navbar setPage={setPage} handleLogout={handleLogout} currentPage={page} user={user} />
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
        <Dashboard setPage={setPage} user={user} />
      )}

      {/* Show Task Page */}
      {isAuthenticated && page === 'tasks' && (
        <TaskPage user={user} />
      )}

      {/* Show Habit Page */}
      {isAuthenticated && page === 'habits' && (
        <HabitPage user={user} />
      )}
    </div>
  );
}


export default App
