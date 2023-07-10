import API from '../utils/axios.js'




export const uploadImage = (data) => API.post("/upload/", data);
export const uploadVideo = (data) => API.post("/upload/video", data);
export const uploadPost = (data) => API.post("/posts", data);
export const uploadComment = (data) => API.post("/posts/addComment", data);
export const uploadCommentReply = (data) => API.post("/posts/addCommentReply", data);


