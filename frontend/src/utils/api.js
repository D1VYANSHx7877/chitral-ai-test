import axios from 'axios';

const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';
const API_URL = import.meta.env.VITE_API_URL || 
 (isProduction ? '/api' : 'http://localhost:5000/api');

console.log('[API Config]', { PROD: import.meta.env.PROD, hostname: window.location.hostname, isProduction, API_URL });

const api = axios.create({
 baseURL: API_URL,
 timeout: 30000,
 headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
 (config) => {
 const token = localStorage.getItem('token');
 if (token) { config.headers.Authorization = `Bearer ${token}`; }
 return config;
 },
 (error) => Promise.reject(error)
);

api.interceptors.response.use(
 (response) => response,
 (error) => {
 if (error.response?.status === 401) {
 localStorage.removeItem('token');
 localStorage.removeItem('user');
 window.location.href = '/login';
 }
 return Promise.reject(error);
 }
);

export default api;
