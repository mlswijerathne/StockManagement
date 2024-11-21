import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5053/api',
    timeout: 10000,
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      if (error.response) {
        // Server responded with error
        return Promise.reject(error.response.data);
      } else if (error.request) {
        // Request made but no response
        return Promise.reject({ message: 'Server not responding. Please try again later.' });
      }
      return Promise.reject({ message: 'Error setting up request.' });
    }
  );

export default API;