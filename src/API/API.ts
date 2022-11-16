import axios from 'axios';
import { BASE_URL } from 'constants/baseUrl';
import { StorageKey } from 'constants/storageKey';

const token = localStorage.getItem(StorageKey.TOKEN);

export const api = axios.create({
  baseURL: BASE_URL,
});

export const apiToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
