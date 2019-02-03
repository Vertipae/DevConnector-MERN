import axios from "axios";
import { GET_ERRORS } from "./types";
// Register user
// Thunk allows to write action creators that return a function instead of an action (dispatch)
export const registerUser = (userData, history) => dispatch => {
  axios
    // Because of the proxy value in package.json localhost:5000 it is fine to do /api/users/register
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    // .catch(err => console.log(err))
    //   .catch(err => console.log(err.response.data));
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
