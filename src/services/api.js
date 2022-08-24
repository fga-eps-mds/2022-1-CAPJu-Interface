import axios from 'axios';

export const baseURL = 'https://capju-service.herokuapp.com/';
const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:3000/'
=======
  baseURL: baseURL
>>>>>>> devel
});

export default api;
