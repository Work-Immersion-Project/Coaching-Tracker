import { takeEvery, put, select, take } from "redux-saga/effects";
import {
  currentUserSelector,
  isDesktopNotificationsEnabledSelector,
} from "../selectors";
import { config } from "../consts/config";
import {
  createWebsocket,
  getNotificationsSuccess,
  setError,
  updateNotificationSuccess,
  checkDesktopNotificationPermissionSuccess,
  checkDesktopNotificationPermissionRequest,
  clearNotificationsSuccess,
  showModal,
  hideModal,
  showAlert,
} from "../actions";
import { eventChannel } from "redux-saga";
import {
  GET_NOTIFICATIONS_REQUEST,
  UPDATE_NOTIFICATION_REQUEST,
  CHECK_DESKTOP_NOTIFICATION_PERMISSION_REQUEST,
  CLEAR_NOTIFICATIONS_REQUEST,
} from "../types";
import axios from "../api";
import NotifIMG from "../components/custom/img/ongoing_session_header.png";
import { toast } from "react-toastify";

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

      parsedJson.forEach((notif) => {
        if (!notif.seen) {
          new Notification("CIIT Coaching Tracker", {
            body: notif.message,
            icon: NotifIMG,
            dir: "ltr",
          });

          toast(notif.message);
        }
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
    yield put(updateNotificationSuccess(payload));
  } catch (error) {}
}

function* checkDesktopNotificationPermissionSaga() {
  try {
    if (!("Notification" in window)) {
      throw new Error("This browser does not support desktop notifications");
    }
    const isDesktopNotificationAllowed = yield Notification.requestPermission();
    if (isDesktopNotificationAllowed === "granted") {
      yield put(checkDesktopNotificationPermissionSuccess(true));
    } else {
      yield put(checkDesktopNotificationPermissionSuccess(false));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* clearNotificationsSaga() {
  try {
    yield put(showModal("LOADING_MODAL"));
    const currentUser = yield select(currentUserSelector);
    yield axios.delete(`notifications/${currentUser.UserID}`);
    yield put(hideModal());
    yield put(showAlert("SUCCESS", "Notifications Cleared!"));
    yield put(clearNotificationsSuccess());
  } catch (error) {}
}

export function* watchNotifications() {
  yield takeEvery(GET_NOTIFICATIONS_REQUEST, getNotificationsSaga);
  yield takeEvery(UPDATE_NOTIFICATION_REQUEST, updateNotificationsSaga);
  yield takeEvery(
    CHECK_DESKTOP_NOTIFICATION_PERMISSION_REQUEST,
    checkDesktopNotificationPermissionSaga
  );
  yield takeEvery(CLEAR_NOTIFICATIONS_REQUEST, clearNotificationsSaga);
}
