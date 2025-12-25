import axios from "axios";
import {
  getToken,
  clearToken,
  clearUser,
  notifyAuthChanged,
} from "../utils/authToken";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        clearToken();
        clearUser();
        notifyAuthChanged();
      } catch (e) {
        void e;
      }

    }
    return Promise.reject(error);
  }
);

export default api;
