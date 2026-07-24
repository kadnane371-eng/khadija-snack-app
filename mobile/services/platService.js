import api from "./api";

export const getPlats = () => api.get("/plats");
export const getPlat = (id) => api.get(`/plats/${id}`);
export const createPlat = (data) => api.post("/plats", data);
export const updatePlat = (id, data) => api.put(`/plats/${id}`, data);
export const deletePlat = (id) => api.delete(`/plats/${id}`);