import { combineReducers } from "redux";
import authReducer from "./authReducer";
import queueReducer from "./queueReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import getQueueReducer from "./getQueueReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  queue: queueReducer,
  getQueue: getQueueReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
