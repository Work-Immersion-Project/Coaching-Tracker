import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import gapiReducer from "./gapiReducer";
import drawerReducer from "./drawerReducer";
import errorReducer from "./errorReducer";
import modalReducer from "./modalReducer";
import teacherReducer from "./teacherReducer";
import studentReducer from "./studentReducer";
import subjectsReducer from "./subjectsReducers";
import coursesReducer from "./coursesReducers";
import fieldsReducer from "./fieldsReducer";
import coachingReducer from "./coachingReducer";
import notificationReducer from "./notificationReducer";
import registrationReducer from "./registrationReducer";
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  registration: registrationReducer,
  notification: notificationReducer,
  fields: fieldsReducer,
  teachers: teacherReducer,
  students: studentReducer,
  gapi: gapiReducer,
  modal: modalReducer,
  subjects: subjectsReducer,
  errors: errorReducer,
  drawer: drawerReducer,
  coaching: coachingReducer,
});
