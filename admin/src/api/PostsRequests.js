import API from '../utils/axios.js'


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= ()=> API.get(`/admin/posts`);
export const getReportedPosts= ()=> API.get(`/admin/postsReport`);
export const blockPost= (id,data)=> API.patch(`/admin/${id}`,data);

