import API from '../utils/axios.js'




export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const updatePost = (data,id) => API.put(`posts/updatePost/${id}`, data);
export const updateComment = (data) => API.put(`posts/updateComment`, data);
export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId})
export const reportPost=(data)=>API.post('posts/report', data)
export const deletePost=(id,userId)=>API.delete(`posts/${id}`, { data: { userId: userId } })
export const deleteComment=(comment,userId)=>API.delete(`posts/deleteComment/${comment._id}`, { data: { comment:comment,userId:userId } })
export const deleteCommentReply=(reply,userId)=>API.delete(`posts/deleteCommentReply/${reply._id}`, { data: { reply:reply,userId:userId } })
