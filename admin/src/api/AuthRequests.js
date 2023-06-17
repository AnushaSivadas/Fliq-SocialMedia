import API from '../utils/axios.js'


export const logIn= (formData)=> API.post('/admin/login',formData);

