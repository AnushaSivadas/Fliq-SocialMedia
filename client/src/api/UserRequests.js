import API from "../utils/axios.js";


export const getUser = (userId) => API.get(`/user/${userId}`);
export const changeUsername = (data) => API.put(`/user/changeUsername`,data);
export const updateUser = ( data) => API.put(`/user/update`, data);
export const getAllUser = () => API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const getFollowers = (id) => API.get(`/user/${id}/followers`);
export const getFollowing = (id) => API.get(`/user/${id}/following`);
export const getFollowedUserSearchData = (search, id) =>  API.get(`/chat/getFollowers/${id}?search=${search}`);
export const searchAllUsers = (search,id) =>  API.get(`/user/searchAllUsers/${id}?search=${search}`);

