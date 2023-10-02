import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dream-connect-g2xg.vercel.app',
  // baseURL: 'http://localhost:4000',
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
