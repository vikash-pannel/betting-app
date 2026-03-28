import axios from "axios";

const API = axios.create({
  baseURL: "https://betting-backend-k4ds.onrender.com/api",
});

// Token auto send karega
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;