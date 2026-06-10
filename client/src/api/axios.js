import axios from "axios";

// ✅ FIX: use VITE env variable so it works on both local and production
// In .env (local):  VITE_API_URL=http://localhost:5000/api
// In Vercel env:    VITE_API_URL=https://your-render-app.onrender.com/api
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://ecobin-api-ers9.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
