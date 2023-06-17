import * as AuthApi from "../api/AuthRequests";
export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/dashboard", { replace: true });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: "AUTH_FAIL" ,data:error.response.data});
  }
};



export const logout = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}
