import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherLogin = () => {
    const [teacherLoginData, setTeacherLoginData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);  // New state to manage loading

    const handleChange = (e) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true when form is submitted

        const teacherFormData = new FormData();
        teacherFormData.append('email', teacherLoginData.email);
        teacherFormData.append('password', teacherLoginData.password);

        axios.post('http://127.0.0.1:8000/api/teacher-login/', teacherFormData)
            .then((res) => {
                setLoading(false);  // Set loading to false after receiving the response
                if (res.data.bool === true) {
                    localStorage.setItem('teacherLoginStatus', 'true');
                    localStorage.setItem('teacherId', res.data.teacher_id);
                    window.location.href = '/teacher-dashboard';
                } else {
                    alert('Invalid login credentials');
                }
            })
            .catch((error) => {
                setLoading(false);  // Set loading to false in case of an error
                console.error('Error during form submission:', error);
            });
    };

    useEffect(() => {
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
        if (teacherLoginStatus === 'true') {
            // window.location.href = '/teacher-dashboard';
        }
    }, []);

    return (
        <div>
            <h2>Teacher Login</h2>
            <form onSubmit={submitForm}>
                <input
                    type="email"
                    name="email"
                    value={teacherLoginData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={teacherLoginData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default TeacherLogin;
