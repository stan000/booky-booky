const initState = {};

const getQueueReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_DATA_SUCCESS":
      console.log("GET_DATA_SUCCESS success");
      console.log(action);
      return {
        ...state,
        ...action.doc,
      };
    case "GETTING_DATA_ERROR":
      console.log("GETTING_DATA_ERROR");
      return { ...state, authError: action.e };
    case "SIGN_OUT_SUCCESS":
      console.log("SIGN_OUT_SUCCESS");
      return state;
    default:
      return state;
  }
};

export default getQueueReducer;
