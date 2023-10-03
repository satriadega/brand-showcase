import { API_URL } from "../../config/api";
import { POSTS_SUCCESS } from "./actionType";

export function fetchPosts() {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const responseJSON = await response.json();
      dispatch({
        type: POSTS_SUCCESS,
        payload: responseJSON.result,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
