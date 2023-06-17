const postReducer = (
  state = {
    posts: [],
    loading: false,
    error: false,
    uploading: false,
    posting: false,
  },
  action
) => {
  switch (action.type) {
    // belongs to PostShare.jsx
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    // belongs to Posts.jsx
    case "UPLOAD_COMMENT_START":
      return { ...state, error: false, posting: true };
    case "UPLOAD_COMMENT_SUCCESS":
      return { ...state, posts: action.data, posting: false, error: false };
    case "UPLOAD_COMMENT_FAIL":
      return { ...state, posting: false, error: true };
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    case "DELETING_START":
      return { ...state, error: false };
    case "DELETING_SUCCESS":
      let array = [...state.posts];

      let elementToDelete = action.data;
      let index = array.findIndex((item) => item.id === elementToDelete.id);
      if (index !== -1) {
        array.splice(index, 1);
      }
      
      return { ...state, posts: array, error: false };
    case "DELETING_COMMENT":
      return { ...state, posts: action.data, loading: false, error: false };
    case "DELETE_FAIL":
      return { ...state, error: true };
    default:
      return state;
  }
};

export default postReducer;
