import { TEST_DISPATCH } from "../actions/types";

// Alkuperäinen tila on, että käyttäjä ei ole kirjautunut sisään ja käyttäjänä on tyhjä objecti
const initialState = {
  isAuthenticated: false,
  user: {}
};

// Dispatching actions to this reducer and testing it with switch
export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        // Payload aka userData (from the authActions.js TEST_DISPATCH)
        user: action.payload
      };
    default:
      return state; // Default case which is going to return the state as it is
  }
}
