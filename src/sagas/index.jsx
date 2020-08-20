import { watchGapi } from "./gapiSaga";
import { fork } from "redux-saga/effects";
import watchAuth from "./authSaga";
import { watchRegistration } from "./registrationSaga";
import { watchStudent } from "./studentSaga";
import { watchTeacher } from "./teacherSaga";
import { watchField } from "./fieldSaga";
import { watchSubjects } from "./subjectsSaga";
import { watchCoachingSession } from "./coachingSessionSaga";
import { watchWebsocket } from "./websocketSaga";
import { watchNotifications } from "./notificationsSaga";

function* rootSaga() {
  yield fork(watchGapi);
  yield fork(watchAuth);
  yield fork(watchRegistration);
  yield fork(watchTeacher);
  yield fork(watchStudent);
  yield fork(watchField);
  yield fork(watchSubjects);
  yield fork(watchCoachingSession);
  yield fork(watchWebsocket);
  yield fork(watchNotifications);
}

export default rootSaga;
