import axios from 'axios';

const API_URL = 'https://coinbackend-cpyg.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Enable credentials
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


export const register = async (email: string, password: string) => {
  try {
    const response = await api.post('/register', { email, password });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getBalance = async () => {
  try {
    const response = await api.get('/balance');
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const createTransaction = async (amount: number, btcAmount: number, recipientAddress: string) => {
  try {
    const response = await api.post('/transactions', { amount, btcAmount, recipientAddress });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error: any) {
    throw error;
  }
};