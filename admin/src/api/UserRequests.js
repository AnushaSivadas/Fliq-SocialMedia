import API from '../utils/axios.js'

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
  
export const blockUser = (data)=> API.put(`/admin/users/block`, data)
export const getAllUser = ()=> API.get('/admin/users')