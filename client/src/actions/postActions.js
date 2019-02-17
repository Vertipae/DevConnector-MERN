import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "./types";

// Add post
export const addPost = postData => dispatch => {
  // console.log(postData);
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res => {
      // console.log(res.data);
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
      // console.log(res.data);
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

// Get post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_POST,
        payload: res.data // The actual post data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POST, // Not using a form so don't want specific errors
        payload: null
      })
    );
};

// Delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => {
      // console.log(res.data);
      dispatch(getPosts());
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Remove like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => {
      // console.log(res.data);
      dispatch(getPosts());
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add comment
export const addComment = (postId, commentData) => dispatch => {
  // console.log(postData);
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_POST,
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

// Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  // console.log(postData);
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_POST,
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

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
