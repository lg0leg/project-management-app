import axios from 'axios';
export const BASE_URL = 'https://final-task-backend-production-27b0.up.railway.app/';

export const api = axios.create({
  baseURL: BASE_URL,
});
