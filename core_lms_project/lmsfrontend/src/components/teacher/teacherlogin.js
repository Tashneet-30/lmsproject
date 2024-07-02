import React, { useState } from 'react';
import axios from 'axios';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    axios.post('http://localhost:8000/api/login-teacher/', { email, password })
      .then(response => {
        console.log('Login successful:', response.data);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        // Redirect to the teacher's dashboard
        window.location.href = '/teacher-dashboard';
      })
      .catch(error => {
        console.error('Login error:', error);
        setError('Invalid email or password');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teacher Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default TeacherLogin;

