import axios from 'axios';

const API_URL = 'https://todo-app-o03m.onrender.com'
interface UserData {
  username: string;
  password: string;
  email?: string;
}

export const registerUser = async (userData: UserData) => {    
    return await axios.post(`${API_URL}/api/auth/register`, userData);
};

export const loginUser = async (userData: UserData) => {
  return await axios.post(`${API_URL}/api/auth/login`, userData);
};
