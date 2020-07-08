import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import gapiReducer from "./gapiReducer";
import drawerReducer from "./drawerReducer";
import errorReducer from "./errorReducer";
import modalReducer from "./modalReducer";
import teacherReducer from "./teacherReducer";
import studentReducer from "./studentReducer";
import calendarReducer from "./calendarReducer";
import coachingReducer from "./coachingReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  users: usersReducer,
  teachers: teacherReducer,
  students: studentReducer,
  gapi: gapiReducer,
  modal: modalReducer,
  errors: errorReducer,
  calendar: calendarReducer,
  drawer: drawerReducer,
  coaching: coachingReducer,
});
