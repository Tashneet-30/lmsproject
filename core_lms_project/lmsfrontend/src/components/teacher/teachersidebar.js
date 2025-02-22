import React from 'react';
import { Link } from 'react-router-dom';

function TeachersideBar() {
    const teacherId = localStorage.getItem('teacherId');
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/teacher-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/teachermy-courses" className="list-group-item list-group-item-action">My Courses</Link>
                <Link to={`/user-list/${teacherId}`} className="list-group-item list-group-item-action">My Users</Link>
                <Link to="/add-courses" className="list-group-item list-group-item-action">Add courses</Link>
                <Link to="/all-quiz" className="list-group-item list-group-item-action">Quiz</Link>
                <Link to="/add-quiz" className="list-group-item list-group-item-action">Add Quiz</Link>
                <Link to="/profile-settings" className="list-group-item list-group-item-action">Profile Settings</Link>
                <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
                <Link to="/logout-teacher" className="list-group-item list-group-item-action text-danger">Logout</Link>
            </div>
        </div>
    );
}

export default TeachersideBar;
