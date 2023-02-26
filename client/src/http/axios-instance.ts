import axios, { AxiosInstance } from 'axios';
import { BASIC_URL } from 'constants/constants';

const $api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASIC_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;
