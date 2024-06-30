import React, { useEffect } from 'react';

function TeacherLogout() {
  useEffect(() => {
    localStorage.removeItem('teacherLoginStatus');
    localStorage.removeItem('teacherEmail');
    window.location.href = '/teacher-login';
  }, []);

  return <div>Logging out...</div>;
}

export default TeacherLogout;
