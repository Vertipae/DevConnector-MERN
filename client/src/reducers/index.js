import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

// Reducers put in object (example: auth is usable when calling an action)
const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});

export default rootReducer;
