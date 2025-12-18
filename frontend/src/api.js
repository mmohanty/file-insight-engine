import axios from "axios";

const API = "http://localhost:8000";

export const uploadFile = async (file, userId, useCase) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);
  formData.append("useCase", useCase);
  return axios.post(`${API}/upload`, formData);
};

export const getFiles = () => axios.get(`${API}/files`);
export const getFile = (id) => axios.get(`${API}/files/${id}`);
export const deleteFile = (id) => axios.delete(`${API}/files/${id}`);
