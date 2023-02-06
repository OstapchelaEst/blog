import axios, { AxiosInstance } from 'axios';
import { BASIC_URL } from 'constants/constants';

const $api: AxiosInstance = axios.create({ withCredentials: true, baseURL: BASIC_URL });

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  config.withCredentials = true;
  return config;
});

$api.defaults.withCredentials = true;

export default $api;
