import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const initialState = {};
const middleware = [thunk];

// const store = createStore(() => [], {}, applyMiddleware());
// First parameter is route reducer
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Implementing the Redux-devtools extension
  )
);

export default store;
