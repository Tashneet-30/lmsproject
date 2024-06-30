import React, { useState } from 'react';
import { register } from '../../services/authService'; // Import named export

const Register = () => {
  const [user, setUser] = useState({
    full_name: '',
    email: '',
    password: '',
    username: '',
    interest: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(user)
      .then((response) => {
        console.log('Registration successful:', response.data);
        setUser({
          full_name: '',
          email: '',
          password: '',
          username: '',
          interest: ''
        });
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Registration</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={user.full_name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="interest" className="form-label">Interest</label>
          <input
            type="text"
            id="interest"
            name="interest"
            value={user.interest}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your interest"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
