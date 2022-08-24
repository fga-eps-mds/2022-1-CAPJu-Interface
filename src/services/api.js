import axios from 'axios';

export const baseURL = process.env.PROD
  ? 'https://capju-service.herokuapp.com/'
  : 'http://localhost:3333';
const api = axios.create({
  baseURL: 'https://capju-service.herokuapp.com/'
});

export default api;
