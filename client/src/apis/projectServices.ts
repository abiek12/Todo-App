import axios from "axios"

const API_URL = 'http://localhost:3000'; // Your backend API URL

const getToken = async () => {
    return localStorage.getItem('accessToken');
}

const authHeaders = async () => {
    const token = await getToken();
    return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
}

export const fetchAllProjects =  async () => {
    return await axios.get(`${API_URL}/api/project`, await authHeaders());
}

export const createProject = async (projectData: any) => {
    return axios.post(`${API_URL}/api/project`, projectData, await authHeaders());
}