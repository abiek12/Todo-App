import axios from "axios"

const API_URL = 'http://localhost:3000'; // Your backend API URL

export const fetchAllProjects =  async () => {
    return await axios.get(`${API_URL}/api/project`);
}

export const createProject = async (projectData: any) => {
    return axios.post(`${API_URL}/api/project`, projectData);
}