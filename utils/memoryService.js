// utils/memoryService.js
import api from "./api";

// Fetch all memories
export const fetchMemories = () => api.get("/memories");

// Create memory
export const createMemory = (data) => api.post("/memories", data);

// Update memory
export const updateMemory = (id, data) => api.put(`/memories/${id}`, data);

// Delete memory
export const deleteMemory = (id) => api.delete(`/memories/${id}`);
