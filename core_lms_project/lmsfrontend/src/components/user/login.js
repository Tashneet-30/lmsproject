import React, { useState } from 'react';
import { login } from '../../services/authService';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        login(credentials)
            .then((response) => {
                console.log('Login successful:', response.data);
                // Handle successful login (e.g., redirect to dashboard)
            })
            .catch((error) => {
                console.error('Login error:', error);
                // Handle login error (e.g., display error message)
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Student Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" name="username" value={credentials.username} onChange={handleChange} className="form-control" placeholder="Enter your username" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} className="form-control" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
