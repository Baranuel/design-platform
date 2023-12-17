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



axiosInstance.interceptors.request.use(
    async config => {
        const {getToken} = auth()
      const token = await getToken()
      if (token) {
        config.headers.Authorization = "Bearer "+token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  );

