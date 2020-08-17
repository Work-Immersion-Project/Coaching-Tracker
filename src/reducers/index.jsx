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
import fieldsReducer from "./fieldsReducer";
import coachingReducer from "./coachingReducer";
import alertsReducer from "./alertsReducer";
import registrationReducer from "./registrationReducer";
import notificationReducer from "./notificationReducer";
import coachingLogReducer from "./coachingLogReducer";
const reducers = combineReducers({
  auth: authReducer,
  form: formReducer,
  registration: registrationReducer,
  notifications: notificationReducer,
  coachingLog: coachingLogReducer,
  alerts: alertsReducer,
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

export default reducers;
