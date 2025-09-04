// ForgotPassword.jsx
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';


const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Reset Password</h2>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="email" placeholder="Enter your email" required />
        </div>

        <button type="submit" className="auth-btn">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;