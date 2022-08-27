import axios from 'axios';

export const userURL = process.env.REACT_APP_DEV
  ? 'http://localhost:3334'
  : 'https://capju-user.herokuapp.com/';

const api = axios.create({
  baseURL: userURL
});

export default api;
