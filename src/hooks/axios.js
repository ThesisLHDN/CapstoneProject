import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://backend-capstone-project.vercel.app/',
  withCredentials: false,
});

export default instance;
