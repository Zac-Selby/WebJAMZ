import React from 'react';
import taskaroologo from './assets/taskaroologo.png';
import webjamzlogo from './assets/webjamzlogo.png'; 


function Signup({ switchToLogin }) {
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
        <form className="auth-form">
          <label htmlFor="signupEmail">Email</label>
          <input id="signupEmail" type="email" placeholder="Email" required />

          <label htmlFor="signupPassword">Password</label>
          <input id="signupPassword" type="password" placeholder="Password" required />

          <label htmlFor="signupConfirm">Confirm Password</label>
          <input id="signupConfirm" type="password" placeholder="Confirm Password" required />

          <button type="submit" className="primary">Create Account</button>
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