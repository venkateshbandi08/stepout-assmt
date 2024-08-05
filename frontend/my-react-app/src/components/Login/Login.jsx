// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config/config';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    localStorage.removeItem('authToken');
    e.preventDefault();
    try {
      const response = await axios.post(`${config.backendUrl}/api/login`, formData);
      console.log(formData)
      console.log(response)
      if (response.data.success) {
        // Store the token in localStorage
        localStorage.setItem('authToken', response.data.token);
        toast.success('Login successful!');
        // Redirect or handle successful login
        // For example, you might want to redirect to the homepage or dashboard
        window.location.href = '/';
      } else {
        toast.error(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
