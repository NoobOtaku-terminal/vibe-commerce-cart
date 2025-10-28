import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Cart API
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post('/cart', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const response = await api.put(`/cart/${cartItemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (cartItemId) => {
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data;
};

// Checkout API
export const checkout = async (customerName, customerEmail, cartItems) => {
  const response = await api.post('/checkout', {
    customerName,
    customerEmail,
    cartItems,
  });
  return response.data;
};

// Orders API
export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export default api;
