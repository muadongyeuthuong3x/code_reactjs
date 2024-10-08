

// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
// config axios set get in file if code call api be


export default axiosInstance;
