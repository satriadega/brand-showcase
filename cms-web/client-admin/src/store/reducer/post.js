import { POSTS_SUCCESS, POSTS_LOADING } from "../action/actionType";

const initialState = {
  posts: [],
  postsLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
