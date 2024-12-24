import axios from 'axios';
import dotenv from 'dotenv';

// dotenv.config();
// const API_ENDPOINT = import.meta.env.VITE_API_URL;
const API_ENDPOINT = import.meta.env.VITE_API_URL;

// Register user
const register = async (userData) => {
  const response = await axios.post(
    `${API_ENDPOINT}/api/users/register`,
    userData
  );
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(
    `${API_ENDPOINT}/api/users/login`,
    userData
  );
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
