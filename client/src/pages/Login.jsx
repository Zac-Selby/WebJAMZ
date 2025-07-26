import React from 'react';
import taskaroologo from '../assets/Taskaroo Logo.png';
import webjamzlogo from '../assets/WebJAMZ Logo.png'; 


function Login({ switchToSignup, onLogin }) {
  return (
    <div className="auth-container">
        <div className="logo-row">
            <img src={webjamzlogo} alt="WebJAMZ Logo" className="logo-webjamz" />
            <img src={taskaroologo} alt="Taskaroo Logo" className="logo-taskaroo" />
        </div>
    
      <h2 className="tagline">Task & Habit Tracker</h2>
      
      
      <div className="login-box">
        <h3 className="form-title">Login</h3>
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(); // simulate login
          }}
        >
          <label htmlFor="loginEmail">Email</label>
          <input id="loginEmail" type="email" placeholder="Email" required />

          <label htmlFor="loginPassword">Password</label>
          <input id="loginPassword" type="password" placeholder="Password" required />

          <button type="submit" className="primary">Log In</button>
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