import axios from "axios";

const API_URL = "http://localhost:7001/api"; // Adjust the URL based on your backend setup

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include Authorization header
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Get the token from sessionStorage
    console.log(token);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data; // Handle error response
  }
};

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data; // Handle error response
  }
};

// Categories API
export const getCategories = async () => {
  const response = await api.get("/admin/categories");
  return response.data;
};

export const addCategory = async (category) => {
  const response = await api.post("/admin/categories", category);
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await api.put(`/admin/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/admin/categories/${id}`);
  return response.data;
};

// Products API

// Get all products
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Add a product
export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// Update a product
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Order API

export const placeOrder = async (orderDetails) => {
  const response = await api.post("/orders", orderDetails);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Delete an order
export const deleteOrder = async (orderId) => {
  const response = await api.delete(`/orders/${orderId}`);
  return response.data;
};

export const getPaymentSlips = async () => {
  const response = await api.get("/payment-slips");
  return response.data;
};

// Payment API
export const uploadPaymentSlip = async (formData) => {
  const response = await api.post("/uploadPaymentSlip", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Users API
export const getUsers = async (token) => {
  const response = await api.get("/user", {
    headers: { Authorization: token },
  });
  return response.data;
};

export const createUser = async (userData, token) => {
  const response = await api.post("/user", userData, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const updateUser = async (id, userData, token) => {
  const response = await api.put(`/user/${id}`, userData, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const deleteUser = async (id, token) => {
  const response = await api.delete(`/user/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
};
