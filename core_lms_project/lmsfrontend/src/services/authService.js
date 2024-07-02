// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const registerTeacher = (teacherData) => {
    return axios.post(API_URL + 'register-teacher/', teacherData);
};

const loginTeacher = (userData) => {
    return axios.post(API_URL + 'login-teacher/', userData)
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
            }
            return response.data;
        });
};

const logoutTeacher = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const registerStudent = (studentData) => {
    return axios.post(API_URL + 'register/student/', studentData);
};

const loginStudent = (userData) => {
    return axios.post(API_URL + 'login/student/', userData)
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
            }
            return response.data;
        });
};

const logoutStudent = () => {
    localStorage.removeItem('access_token');
};

export { registerTeacher, loginTeacher, logoutTeacher, registerStudent, loginStudent, logoutStudent };
