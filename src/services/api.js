import axios from 'axios';

export const baseURL = 'https://capju-service.herokuapp.com/';
const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

export default api;
