import axios from "axios";

const api = axios.create({
  baseURL: "https://64wjr92x-5000.inc1.devtunnels.ms/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
