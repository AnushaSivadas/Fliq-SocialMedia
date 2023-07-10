import API from '../utils/axios.js'

export const logIn= (formData)=> API.post('/auth/login',formData);

export const signUp = (formData) => API.post('/auth/register', formData);

export const googleRegister = (credential) =>  API.post("/auth/google", credential);