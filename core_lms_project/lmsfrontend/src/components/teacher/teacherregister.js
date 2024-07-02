// TeacherRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const TeacherRegister = () => {
  const [teacher, setTeacher] = useState({
    full_name: '',
    email: '',
    password: '',
    qualification: '',
    mobile_no: '',
    skills: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register-teacher/', teacher)
      .then(response => {
        console.log('Registration successful:', response.data);
        // Optionally, redirect or display a success message
        setTeacher({
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
      <h2 className="mb-4">Teacher Registration</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="full_name" name="full_name" value={teacher.full_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={teacher.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={teacher.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="qualification" className="form-label">Qualification</label>
          <input type="text" className="form-control" id="qualification" name="qualification" value={teacher.qualification} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
          <input type="text" className="form-control" id="mobile_no" name="mobile_no" value={teacher.mobile_no} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="skills" className="form-label">Skills</label>
          <textarea className="form-control" id="skills" name="skills" value={teacher.skills} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegister;
