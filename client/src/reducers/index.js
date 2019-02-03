import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

// Reducers put in object (example: auth is usable when calling an action)
const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer
});

export default rootReducer;
