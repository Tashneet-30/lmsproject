import React from 'react';
import { logoutStudent } from '../../services/authService'; // Import named export

const Logout = () => {
  const handleLogout = () => {
    Logout();
    // Perform any additional cleanup or redirect logic
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
  );
};

export default Logout;
