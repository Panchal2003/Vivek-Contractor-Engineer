import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

export const setAdminKey = (key) => {
  if (!key) {
    localStorage.removeItem("adminKey");
    return;
  }
  localStorage.setItem("adminKey", key);
};

export const clearAdminKey = () => {
  localStorage.removeItem("adminKey");
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const adminKey = localStorage.getItem("adminKey");
  if (adminKey) {
    config.headers["x-admin-key"] = adminKey;
  }
  return config;
});

export const servicesAPI = {
  list: () => api.get("/services"),
  create: (payload) => api.post("/services", payload),
  update: (id, payload) => api.put(`/services/${id}`, payload),
  remove: (id) => api.delete(`/services/${id}`),
};

export const projectsAPI = {
  list: () => api.get("/projects"),
  create: (payload) => api.post("/projects", payload),
  update: (id, payload) => api.put(`/projects/${id}`, payload),
  remove: (id) => api.delete(`/projects/${id}`),
};

export const machineryAPI = {
  list: () => api.get("/machinery"),
  create: (payload) => api.post("/machinery", payload),
  update: (id, payload) => api.put(`/machinery/${id}`, payload),
  remove: (id) => api.delete(`/machinery/${id}`),
};

export const inquiriesAPI = {
  list: () => api.get("/inquiries"),
  create: (payload) => api.post("/inquiries", payload),
  updateStatus: (id, status) => api.patch(`/inquiries/${id}/status`, { status }),
  remove: (id) => api.delete(`/inquiries/${id}`),
};

export const authAPI = {
  login: (adminKey) => api.post("/auth/login", { adminKey }),
  verify: () => api.get("/auth/verify"),
};

export default api;
