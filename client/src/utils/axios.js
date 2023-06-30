import axios from 'axios';
import { baseUrl } from './Constants';


const instance = axios.create({
    baseURL: baseUrl,
 
  });

  instance.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
  
    return req;
  });

 export default instance 