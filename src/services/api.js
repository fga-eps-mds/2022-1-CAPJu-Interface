import axios from 'axios';

export const baseURL = 'http://localhost:3333';
const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

export default api;
