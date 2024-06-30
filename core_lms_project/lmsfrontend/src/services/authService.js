import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const register = (studentData) => {
    return axios.post(API_URL + 'register/student/', studentData);
};

const login = (userData) => {
    return axios.post(API_URL + 'login/student/', userData)
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('access_token');
};

export { register, login, logout };

