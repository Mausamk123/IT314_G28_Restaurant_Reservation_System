// src/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const API_URL = process.env.REACT_APP_API_URL;

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password,isOwner: userType === 'owner' }), // Send email and password in the request body
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSuccessMessage('Login successful!!');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'An error occurred during login.Check Console');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      // Handle any network or other errors
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      {console.log("userType",userType)}
      <h2>{userType === 'customer' ? 'Customer Login' : 'Restaurant Owner Login'}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
