import React, { useState } from 'react';
import axios from 'axios';

const baseurl = "http://localhost:8000/api/";

function TeacherLogin() {
    const [teacherLoginData, setTeacherLoginData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value
        });
    };

    
    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${baseurl}teacher/login/`, {
                email: teacherLoginData.email,
                password: teacherLoginData.password
            });
            console.log('Login response:', response.data);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('teacherLoginStatus', 'true');
                localStorage.setItem('teacherEmail', teacherLoginData.email);
                window.location.href = '/teacher-dashboard';  // Redirect on successful login
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Something went wrong');
        }
    };
    

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={teacherLoginData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={teacherLoginData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;
