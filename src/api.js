import axios from 'axios';

const api = axios.create({
  baseURL: 'https://iti-nest-final-proj-production.up.railway.app/', 
});

export default api;
