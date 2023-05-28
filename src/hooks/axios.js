import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8800',
  withCredentials: false,
});

export default instance;
