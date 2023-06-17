import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts();
    console.log("adminPosts",data)
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getReportedPosts = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  console.log("start")
  try {
    const { data } = await PostsApi.getReportedPosts();
    console.log("getReportedData",data)
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};
