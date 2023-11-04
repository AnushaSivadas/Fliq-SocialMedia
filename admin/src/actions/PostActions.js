import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    console.log("datasss")

    const { data } = await PostsApi.getTimelinePosts();
    console.log("data",data)
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getReportedPosts = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getReportedPosts();
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};
