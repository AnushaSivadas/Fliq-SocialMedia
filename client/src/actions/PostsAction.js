import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const deletePost = (id,userId) => async (dispatch) => {
  dispatch({ type: "DELETING_START" });
  try {
    const { data } = await PostsApi.deletePost(id,userId);   
    dispatch({ type: "DELETING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETING_FAIL" });
  }
};
export const deleteComment = (comment,userId) => async (dispatch) => {
  dispatch({ type: "DELETING_START" });
  try {
    const { data } = await PostsApi.deleteComment(comment,userId);   
    dispatch({ type: "DELETING_COMMENT", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETING_FAIL" });
  }
};