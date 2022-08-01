import axios from 'axios';

const api = axios.create({
  baseURL: 'https://capju-service.herokuapp.com/'
});

export default api;
