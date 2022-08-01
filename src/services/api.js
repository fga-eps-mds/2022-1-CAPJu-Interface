import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-80-150-123.compute-1.amazonaws.com:3333'
});

export default api;
