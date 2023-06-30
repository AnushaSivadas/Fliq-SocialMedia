import * as ChatsApi from "../api/ChatRequests";


export const getChats = (id) => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" });
    try {
      const { data } = await ChatsApi.userChats(id);
    dispatch({ type: "USER_LIST", data: data });
} catch (error) {
      console.log(error);
      dispatch({ type: "RETREIVING_FAIL" });
    }
  };