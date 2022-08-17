import axios from 'axios';

export const baseURL = 'https://capju-service.herokuapp.com/';
const api = axios.create({
  baseURL: baseURL
});

export default api;
