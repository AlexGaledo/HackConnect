import axios from 'axios'

const BASE_URL = import.meta.env.VITE_URL_API;

const axiosInstance = axios.create({
    baseURL : BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {Promise.reject(error)}
)

export default axiosInstance;