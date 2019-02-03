import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; // err.response.data from authActions.js
    default:
      return state; // Default case which is going to return the state as it is
  }
}
