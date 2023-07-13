const chatReducer = (
  state = { chatUsers: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    case "USER_LIST":
      return { ...state, chatUsers: action.data, loading: false, error: false };
    case "SAVE_USER":
      return {
        ...state,
        chatUsers: [...state.chatUsers, action.data],
        uploading: false,
        error: false,
      };
    default:
      return state;
  }
};
export default chatReducer;
