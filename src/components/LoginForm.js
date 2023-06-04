import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Send login credentials to the server
    axios
      .post('http://localhost:8800/api/login', { username, password })
      .then(response => {
        console.log('Logged in successfully');
        window.location = '/home';
      })
      .catch(error => {
        console.log('Failed to log in');
        setError('Oops! Something went wrong.');
        console.error(error);
      });
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label" style={{ color: '#333' }}>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: '#333' }}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {error && <p>{error}</p>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ background: '#333', margin: '5px'}}>Login</button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#333' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'blue' }}>Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
