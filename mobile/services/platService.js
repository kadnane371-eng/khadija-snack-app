import api from "./api";

export const getPlats = () => api.get("/api/plats");
export const getPlat = (id) => api.get(`/api/plats/${id}`);
export const createPlat = (data) => api.post("/api/plats", data);
export const updatePlat = (id, data) => api.put(`/api/plats/${id}`, data);
export const deletePlat = (id) => api.delete(`/api/plats/${id}`);