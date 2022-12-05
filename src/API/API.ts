import axios from 'axios';
import { BASE_URL } from 'constants/baseUrl';
import { StorageKey } from 'constants/storageKey';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const apiToken = axios.create({
  baseURL: BASE_URL,
});

apiToken.interceptors.request.use((config) => {
  const token = localStorage.getItem(StorageKey.TOKEN);
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
