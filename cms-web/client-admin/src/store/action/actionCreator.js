import { API_URL } from "../../config/api";
import {
  POSTS_LOADING,
  POSTS_SUCCESS,
  CATEGORIES_LOADING,
  CATEGORIES_SUCCESS,
} from "./actionType";

export const fetchPostsSuccess = (payload) => {
  return {
    type: POSTS_SUCCESS,
    payload,
  };
};

export function fetchPosts() {
  return async (dispatch) => {
    dispatch({
      type: POSTS_LOADING,
      payload: true,
    });
    try {
      const response = await fetch(`${API_URL}/posts`);
      const responseJSON = await response.json();
      console.log("test", responseJSON);
      dispatch({
        type: POSTS_SUCCESS,
        payload: responseJSON.result,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: POSTS_LOADING,
        payload: false,
      });
    }
  };
}
export function fetchCategories() {
  return async (dispatch) => {
    dispatch({
      type: CATEGORIES_LOADING,
      payload: true,
    });
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const responseJSON = await response.json();
      console.log(responseJSON.result);
      dispatch({
        type: CATEGORIES_SUCCESS,
        payload: responseJSON.result,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: false,
      });
    }
  };
}

export function addPost(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: true,
      });
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const result = await response.json();
      // console.log(result, 5555555);
      if (result.message) {
        throw result.message;
      }
      dispatch(fetchPosts());
    } catch (error) {
      console.log(error, "<<< error");
      throw error;
    } finally {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: false,
      });
    }
  };
}

export function deletePost(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: true,
      });
      const response = await fetch(`${API_URL}/posts/` + id, {
        method: "DELETE",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const result = await response.json();
      console.log(result);
      dispatch(fetchPosts());
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: false,
      });
    }
  };
}

export function updatePost(payload, id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: true,
      });
      const response = await fetch(`${API_URL}/posts/` + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },

        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (Array.isArray(result.message)) {
        throw result.message;
      }
      dispatch(fetchPosts());
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: false,
      });
    }
  };
}

export function login(payload) {
  return async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (result.message) {
        throw result.message;
      }
      localStorage.access_token = result.access_token;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  };
}

export function addUser(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: true,
      });
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const result = await response.json();
      // console.log(result, 5555555);
      if (result.message) {
        throw result.message;
      }
    } catch (error) {
      console.log(error, "<<< error");
      throw error;
    } finally {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: false,
      });
    }
  };
}

export function addCategory(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: true,
      });
      const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const result = await response.json();
      if (result.message) {
        throw result.message;
      }
      dispatch(fetchCategories());
    } catch (error) {
      console.log(error, "<<< error");
      throw error;
    } finally {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: false,
      });
    }
  };
}

export function updateCategory(payload, id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: true,
      });
      const response = await fetch(`${API_URL}/categories/` + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },

        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (Array.isArray(result.message)) {
        throw result.message;
      }
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: false,
      });
    }
  };
}

export function deleteCategory(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: true,
      });
      const response = await fetch(`${API_URL}/categories/` + id, {
        method: "DELETE",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const result = await response.json();
      console.log(result);
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      dispatch({
        type: CATEGORIES_LOADING,
        payload: false,
      });
    }
  };
}
