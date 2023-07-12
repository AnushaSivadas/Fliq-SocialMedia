import Swal from "sweetalert2"
const authReducer = (state = { authData: null, loading: false,registerError: false, error: false, updateLoading: false },action) => {
  switch (action.type) {
    case "AUTH_START":
      return {...state, loading: true, error: false ,registerError: false};
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({...action?.data}));

      return {...state,  authData: action.data, loading: false, error: false ,registerError: false};



      case "AUTH_FAIL":
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: action.data,
        })
      return {...state, loading: false, error: action.data };
      case "AUTH_FAIL_REGISTER":
        Swal.fire({
          icon: "error",
          title: "Register Error",
          text: action.data,
        })
      return {...state, loading: false, registerError: action.data };
    case "UPDATING_START":
      return {...state, updateLoading: true , error: false,registerError: false}
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({...action?.data}));
      return {...state, authData: action.data, updateLoading: false, error: false,registerError: false}
    
    
      case "UPDATING_FAIL":
      return {...state, updateLoading: true, error: true}

      case "UPDATING_USERNAME_START":
      return {...state, updateLoading: true , error: false,registerError: false}
    case "UPDATING_USERNAME_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({...action?.data}));
      return {...state, authData: action.data, updateLoading: false, error: false,registerError: false}    
    
      case "UPDATING_USERNAME_FAIL":
        Swal.fire({
          icon: "error",
          title: "Username should be unique",
          text: action.data,
        })
      return {...state, updateLoading: true, error: false}



    case "LOG_OUT":
      localStorage.clear();
      return {...state,  authData: null, loading: false, error: false, updateLoading: false }


    case "FOLLOW_USER":
      return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]} }}
    
    case "UNFOLLOW_USER":
      return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)]} }}

      default:
      return state;
  }
};

export default authReducer;
