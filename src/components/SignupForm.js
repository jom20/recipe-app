import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Send registration data to the server
    axios
      .post('http://localhost:8800/api/signup', { name, username, password })
      .then(response => {
        console.log('Registered successfully');
        setToken(response.data.token);
        window.location = '/admin';
      })
      .catch(error => {
        console.error(error);
        setError('Error occurred during registration.');
      });
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>SIGNUP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Fullname"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {token && <p>Authentication token: {token}</p>}
          {error && <p>{error}</p>}
          <div className="btn-group">
            <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#333', margin: '5px' }}>
              SIGN UP
            </button>
            <button className="btn btn-primary" style={{ backgroundColor: '#333', margin: '5px' }}>
              <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>
                BACK
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
