import axios from 'axios';
import { StorageKey } from 'constants/storageKey';

const token = localStorage.getItem(StorageKey.TOKEN);
export const BASE_URL = 'https://final-task-backend-production-27b0.up.railway.app/';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const apiToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
