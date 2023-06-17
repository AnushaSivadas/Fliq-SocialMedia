import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action start ")
    const ImageUrl=await UploadApi.uploadImage(data);
    console.log("object",ImageUrl.data)
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost =await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

export const uploadComment = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_COMMENT_START" });
  try {
    console.log("Posting comment success")

    const newComment =await UploadApi.uploadComment(data);
    console.log(newComment)
    dispatch({ type: "UPLOAD_COMMENT_SUCCESS", data: newComment.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_COMMENT_FAIL" });
  }
};
