import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER } from "../actions/types";

// Alkuperäinen tila on, että käyttäjä ei ole kirjautunut sisään ja käyttäjänä on tyhjä objecti
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // Returning the current state and is authenticated
        ...state,
        isAuthenticated: !isEmpty(action.payload), // Checking that the payload isn't empty meaning that the decoded user should be authenticated(token) if its empty then user ain't authenticated
        user: action.payload
      };
    default:
      return state; // Default case which is going to return the state as it is
  }
}
