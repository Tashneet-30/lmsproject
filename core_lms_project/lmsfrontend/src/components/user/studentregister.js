// studentRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentRegister = () => {
  const [student, setstudent] = useState({
    full_name: '',
    email: '',
    password: '',
    username: '',
    
    interest: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstudent({ ...student, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register-student/', student)
      .then(response => {
        console.log('Registration successful:', response.data);
        // Optionally, redirect or display a success message
        setstudent({
          full_name: '',
          email: '',
          password: '',
          qualification: '',
          mobile_no: '',
          skills: ''
        });
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">student Registration</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="full_name" name="full_name" value={student.full_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={student.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={student.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={student.username} onChange={handleChange} required />
        </div>
     
        <div className="mb-3">
          <label htmlFor="interest" className="form-label">Interest</label>
          <textarea className="form-control" id="interest" name="interest" value={student.interest} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
