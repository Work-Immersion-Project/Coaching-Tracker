import { watchGapi } from "./gapiSaga";
import { fork } from "redux-saga/effects";
import watchAuth from "./authSaga";

function* rootSaga() {
  yield fork(watchGapi);
  yield fork(watchAuth);
}

export default rootSaga;
