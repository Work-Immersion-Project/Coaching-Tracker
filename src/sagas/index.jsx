import { watchGapi } from "./gapiSaga";
import { fork } from "redux-saga/effects";
import watchAuth from "./authSaga";
import { watchRegistration } from "./registrationSaga";
import { watchStudent } from "./studentSaga";
import { watchTeacher } from "./teacherSaga";

function* rootSaga() {
  yield fork(watchGapi);
  yield fork(watchAuth);
  yield fork(watchRegistration);
  yield fork(watchTeacher);
  yield fork(watchStudent);
}

export default rootSaga;
