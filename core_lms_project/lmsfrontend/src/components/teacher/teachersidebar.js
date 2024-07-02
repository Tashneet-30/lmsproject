import React from 'react';
import { Link } from 'react-router-dom';

function TeacherSidebar() {
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/teacher-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/teachermy-courses" className="list-group-item list-group-item-action">My Courses</Link>
                <Link to="/my-users" className="list-group-item list-group-item-action">My Users</Link>
                <Link to="/add-courses" className="list-group-item list-group-item-action">Add courses</Link>
                <Link to="/profile-settings" className="list-group-item list-group-item-action">Profile Settings</Link>
                <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
                <Link to="/logout-teacher" className="list-group-item list-group-item-action text-danger">Logout</Link>
            </div>
        </div>
    );
}

export default TeacherSidebar;
