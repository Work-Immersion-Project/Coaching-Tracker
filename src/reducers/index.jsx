import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import gapiReducer from "./gapiReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  users: usersReducer,
  gapi: gapiReducer,
});
