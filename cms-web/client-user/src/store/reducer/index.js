import { combineReducers } from "redux";
import postReducer from "./post";
import postDetailReducer from "./postDetailReducer";

const rootReducer = combineReducers({
  post: postReducer,
  postDetail: postDetailReducer,
});

export default rootReducer;
