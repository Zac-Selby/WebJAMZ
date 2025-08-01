import React, { useState } from 'react';
import taskaroologo from '../assets/Taskaroo Logo.png';
import webjamzlogo from '../assets/WebJAMZ Logo.png'; 

const API_BASE_URL = 'https://webjamz-backend.onrender.com/api';

function Signup({ switchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
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
          username: data.username,
          email: data.email
        }));
        
        alert('Account created successfully!');
        switchToLogin(); // Switch to login after successful signup
      } else {
        setError(data.message || 'Failed to create account');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Signup error:', err);
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

      {/* Sign Up Form */}
      <div className="signup-box">
        <h3 className="form-title">Sign Up</h3>
        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="signupName">Name</label>
          <input 
            id="signupName" 
            name="username"
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />

          <label htmlFor="signupEmail">Email</label>
          <input 
            id="signupEmail" 
            name="email"
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />

          <label htmlFor="signupPassword">Password</label>
          <input 
            id="signupPassword" 
            name="password"
            type="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />

          <label htmlFor="signupConfirm">Confirm Password</label>
          <input 
            id="signupConfirm" 
            name="confirmPassword"
            type="password" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />

          <button type="submit" className="primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="signup-link">
          Already have an account?{' '}
          <button className="link-button" onClick={switchToLogin}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;