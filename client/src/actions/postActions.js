import axios from "axios";

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from "./types";

// Add post
export const addPost = postData => dispatch => {
  // console.log(postData);
  axios
    .post("/api/posts", postData)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_POST,
        payload: res.data // The actual post data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_POSTS,
        payload: res.data // The actual post data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POSTS, // Not using a form so don't want specific errors
        payload: null
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
