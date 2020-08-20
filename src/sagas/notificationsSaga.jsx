import { takeEvery, put, select, take } from "redux-saga/effects";
import { currentUserSelector } from "../selectors";
import { config } from "../consts/config";
import {
  createWebsocket,
  getNotificationsSuccess,
  setError,
  updateNotificationSuccess,
} from "../actions";
import { eventChannel } from "redux-saga";
import {
  GET_NOTIFICATIONS_REQUEST,
  UPDATE_NOTIFICATION_REQUEST,
} from "../types";
import axios from "../api";

function* getNotificationsSaga() {
  const currentUser = yield select(currentUserSelector);
  const ws = new WebSocket(
    `${config.WS_BASE_URL}/notifications/${currentUser.UserID}`
  );
  const channel = eventChannel((subs) => (ws.onmessage = (e) => subs(e.data)));

  yield put(createWebsocket(ws));

  try {
    while (true) {
      const response = yield take(channel);
      const rawNotifs = JSON.parse(response);

      const parsedJson = rawNotifs.data.map((n) => {
        const notif = n;
        return {
          ...notif,
          payload: JSON.parse(notif.payload),
        };
      });
      yield put(getNotificationsSuccess(parsedJson));
    }
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.data.error));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* updateNotificationsSaga({ payload }) {
  try {
    yield axios.patch(`notifications/${payload}`);
    yield put(updateNotificationSuccess());
  } catch (error) {}
}

export function* watchNotifications() {
  yield takeEvery(GET_NOTIFICATIONS_REQUEST, getNotificationsSaga);
  yield takeEvery(UPDATE_NOTIFICATION_REQUEST, updateNotificationsSaga);
}
