import { combineReducers } from "redux";
import authReducer from "./authReducer";

// Reducers put in object (example: auth is usable when calling an action)
const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
