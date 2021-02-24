const initState = {
  authError: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };
    case "LOGIN_ERROR":
      console.log("LOGIN_ERROR");
      return { ...state, authError: action.authError };
    case "SIGN_OUT_SUCCESS":
      console.log("SIGN_OUT_SUCCESS");
      return state;
    default:
      return state;
  }
};

export default authReducer;
