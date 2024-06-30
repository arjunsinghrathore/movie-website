import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/login', formData); // Use localhost for local testing
      setIsLoading(false);
      navigate('/userpage'); // Navigate to user page on successful login
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ apiError: error.response.data });
      } else {
        setErrors({ apiError: 'Login failed. Please try again.' });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit" disabled={isLoading}>Login</button>
        {isLoading && <p>Loading...</p>}
        {errors.apiError && <p>{errors.apiError}</p>}
      </form>
      <p>Not registered? <Link to="/register">Register here</Link></p> {/* Add navigation link */}
    </div>
  );
};

export default LoginForm;
