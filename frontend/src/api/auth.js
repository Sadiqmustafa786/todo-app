import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/user"; // Your API base URL

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
