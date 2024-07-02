// TeacherLogout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutTeacher } from '../../services/authService';

const TeacherLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logoutTeacher();
    navigate('/login-teacher');  // Redirect to the login page after logout
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Logging out...</h2>
    </div>
  );
};

export default TeacherLogout;

