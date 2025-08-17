// File: client/src/utils/api.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleResponse = (response) => response.data;

// Products
// This function can now handle fetching all products OR products by category
export const fetchProducts = (category) => {
  let url = '/products';
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }
  return api.get(url).then(handleResponse);
};
export const fetchProductById = (id) => api.get(`/products/${id}`).then(handleResponse);
export const fetchFeaturedProducts = () => api.get('/products?featured=true').then(handleResponse);
export const addProduct = (productData) => api.post('/products', productData).then(handleResponse);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then(handleResponse);

// Auth
export const loginUser = (email, password) => 
  api.post('/auth/login', { email, password }).then(handleResponse);
export const registerUser = (userData) => 
  api.post('/auth/register', userData).then(handleResponse);

// Orders
export const fetchOrders = () => api.get('/orders').then(handleResponse);
export const placeOrder = (orderData) => 
  api.post('/orders', orderData)
    .then(response => {
      if (!response.data._id) {
        throw new Error('Order ID not received');
      }
      return response.data;
    })
    .catch(error => {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    });
export const updateOrderStatus = (orderId, status) => 
  api.patch(`/orders/${orderId}`, { status }).then(handleResponse);

// Users
export const fetchUsers = () => api.get('/users').then(handleResponse);

export default api;




