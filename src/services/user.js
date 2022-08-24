import axios from 'axios';

export const baseURL = process.env.PROD
  ? 'https://capju-user.herokuapp.com/'
  : 'http://localhost:3334';
const api = axios.create({
  baseURL: 'https://capju-user.herokuapp.com/'
});

export default api;
