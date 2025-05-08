import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/todo";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const getTasks = async (userId, token) => {
  try {
    const response = await api.get(`/getAll/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (task, token) => {
  try {
    const response = await api.post("/create", task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (taskId, task, token) => {
  try {
    const response = await api.patch(`/update/${taskId}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId, token) => {
  try {
    const response = await api.delete(`/delete/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
