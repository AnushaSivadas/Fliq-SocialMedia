import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    const ImageUrl = await UploadApi.uploadImage(data);
    console.log("object", ImageUrl.data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    console.log("useraction",data)
    const newPost = await UploadApi.uploady7Post(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

export const uploadComment = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_COMMENT_START" });
  try {
    const newComment = await UploadApi.uploadComment(data);
    dispatch({ type: "UPLOAD_COMMENT_SUCCESS", data: newComment.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_COMMENT_FAIL" });
  }
};
