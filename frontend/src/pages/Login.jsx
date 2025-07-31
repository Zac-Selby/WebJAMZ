import React, { useState } from 'react';
import taskaroologo from '../assets/Taskaroo Logo.png';
import webjamzlogo from '../assets/WebJAMZ Logo.png'; 

const API_BASE_URL = 'https://webjamz-backend.onrender.com/api';

function Login({ switchToSignup, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email
        }));
        
        onLogin(); // Call the onLogin callback to redirect to dashboard
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
        <div className="logo-row">
            <img src={webjamzlogo} alt="WebJAMZ Logo" className="logo-webjamz" />
            <img src={taskaroologo} alt="Taskaroo Logo" className="logo-taskaroo" />
        </div>
    
      <h2 className="tagline">Task & Habit Tracker</h2>
      
      
      <div className="login-box">
        <h3 className="form-title">Login</h3>
        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="loginEmail">Email</label>
          <input 
            id="loginEmail" 
            name="email"
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />

          <label htmlFor="loginPassword">Password</label>
          <input 
            id="loginPassword" 
            name="password"
            type="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />

          <button type="submit" className="primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{' '}
          <button className="link-button" onClick={switchToSignup}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;