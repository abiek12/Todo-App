import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Your backend API URL

export const registerUser = async (userData:any) => {    
    return await axios.post(`${API_URL}/api/auth/register`, userData);
};

export const loginUser = async (userData: any) => {
  return await axios.post(`${API_URL}/api/auth/login`, userData);
};
