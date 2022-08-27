import axios from 'axios';

export const userURL = process.env.DEV
  ? 'http://localhost:3334'
  : 'https://capju-user.herokuapp.com/';

const api = axios.create({
  baseURL: userURL
});

export default api;
