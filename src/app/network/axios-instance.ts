import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/' : 'http://https://design-platform.vercel.app/api/';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});


