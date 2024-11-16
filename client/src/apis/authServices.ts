import axios from 'axios';

const API_URL = 'https://todo-app-o03m.onrender.com'
export const registerUser = async (userData:any) => {    
    return await axios.post(`${API_URL}/api/auth/register`, userData);
};

export const loginUser = async (userData: any) => {
  return await axios.post(`${API_URL}/api/auth/login`, userData);
};
