import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5050/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  if (process.env.NODE_ENV === 'development') {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
  }
  return config;
}, (error) => {
  if (process.env.NODE_ENV === 'development') console.error('Request error:', error);
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') console.log('API Response:', response.status, response.data?.message || response.data);
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
      });
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  return Promise.reject(error);
  }
);

export default axiosInstance;
