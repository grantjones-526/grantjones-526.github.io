import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

// API methods

export const getProjects = async () => {
  try {
    const data = await api.get('/projects');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getGitHubRepos = async () => {
  try {
    const data = await api.get('/github/repos');
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitContact = async (contactData) => {
  try {
    const data = await api.post('/contact', contactData);
    return data;
  } catch (error) {
    throw error;
  }
};

export default api;
