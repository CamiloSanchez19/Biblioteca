import axios from 'axios';

// instancia de axios preconfigurada
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL de  backend Laravel
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;