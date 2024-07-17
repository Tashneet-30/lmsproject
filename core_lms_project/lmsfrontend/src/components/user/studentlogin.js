import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentLogin = () => {
    const [studentLoginData, setstudentLoginData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);  // New state to manage loading

    const handleChange = (e) => {
        setstudentLoginData({
            ...studentLoginData,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true when form is submitted

        const studentFormData = new FormData();
        studentFormData.append('email', studentLoginData.email);
        studentFormData.append('password', studentLoginData.password);

        axios.post('http://127.0.0.1:8000/api/student-login/', studentFormData)
            .then((res) => {
                setLoading(false);  // Set loading to false after receiving the response
                if (res.data.bool === true) {
                    localStorage.setItem('studentLoginStatus', 'true');
                    localStorage.setItem('studentId', res.data.student_id);
                    window.location.href = '/student-dashboard';
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
        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if (studentLoginStatus === 'true') {
            // window.location.href = '/student-dashboard';
        }
    }, []);

    return (
        <div>
            <h2>student Login</h2>
            <form onSubmit={submitForm}>
                <input
                    type="email"
                    name="email"
                    value={studentLoginData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={studentLoginData.password}
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

export default StudentLogin;

