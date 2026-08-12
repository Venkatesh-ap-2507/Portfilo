/**
 * API Service
 * ============
 * Centralized Axios instance for all API calls.
 */

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`→ ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail || error.message || "Something went wrong";
    console.error(`API Error: ${message}`);
    return Promise.reject(error);
  },
);

// ── API Functions ────────────────────────────────────────

/** Fetch all projects */
export const fetchProjects = () => api.get("/projects");

/** Fetch all skills */
export const fetchSkills = () => api.get("/skills");

/** Fetch all experiences */
export const fetchExperiences = () => api.get("/experience");

/** Fetch all certifications */
export const fetchCertifications = () => api.get("/certifications");

/** Submit contact form */
export const submitContact = (data) => api.post("/contact", data);

/** Send chatbot message */
export const sendChatMessage = (message) => api.post("/chatbot", { message });

/** Health check */
export const healthCheck = () => api.get("/health");

export default api;
