import axios from 'axios';
import { auth } from '@clerk/nextjs';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://design-platform.vercel.app/api';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
}
});



    // Add a request interceptor
axiosInstance.interceptors.request.use(async config => {
    const authentication = auth();
    // Get the token from your auth method
    const token = await authentication.getToken(); // Replace with your method to get the token

    // If token is available, add it to the request's headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});
