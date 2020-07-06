import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import gapiReducer from "./gapiReducer";
import drawerReducer from "./drawerReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  users: usersReducer,
  gapi: gapiReducer,
  modal: modalReducer,
  isDrawerOpen: drawerReducer,
});
