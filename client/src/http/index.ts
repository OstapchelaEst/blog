import axios from "axios";
import { BASIC_URL } from "constants/constants";

const $api = axios.create({
  baseURL:BASIC_URL,
})

$api.interceptors.request.use((config)=>{
config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
return config;
})


export default $api;