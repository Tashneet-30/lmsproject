import React, { useState } from 'react';
import { register } from '../../services/authService'; // Import named export

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
    register(teacher)
      .then((response) => {
        console.log('Registration successful:', response.data);
        setTeacher({
          full_name: '',
          email: '',
          password: '',
          qualification: '',
          mobile_no: '',
          skills: ''
        });
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teacher Registration</h2>
      <form onSubmit={handleRegister}>
        {/* Input fields for full_name, email, password, qualification, mobile_no, skills */}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegister;
