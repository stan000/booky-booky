const initState = {
  currentServingNumber: 1,
  nextAvailableNumber: 2,
};
const queueReducer = (state = initState, action) => {
  switch (action.type) {
    case "BOOK_NUMBER":
      console.log("created project", action);
      return state;
    case "BOOKING_ERROR":
      console.log("booking error: ", action.e);
      return state;
    default:
      return state;
  }
};

export default queueReducer;
