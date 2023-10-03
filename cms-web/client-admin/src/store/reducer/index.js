import { combineReducers } from "redux";
import postReducer from "./post";
import categoryReducer from "./category";

const rootReducer = combineReducers({
  post: postReducer,
  category: categoryReducer,
});

export default rootReducer;
