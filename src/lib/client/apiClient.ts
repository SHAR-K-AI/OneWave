import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export default apiClient;