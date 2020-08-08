import { GAPI_INIT_REQUEST } from "../types";
import { gapiInitSuccess } from "../actions";
import { takeEvery, put } from "redux-saga/effects";

function* gapiInit() {
  const gapiClients = yield new Promise((resolve) => {
    window.gapi.load("client", async () => {
      await window.gapi.client.init({
        apiKey: "AIzaSyCwBrZzbSRO7cuGyEuB80IKENrQqRrhoTc",
        clientId:
          "347125005886-kt2hubgo6bljk7m9q0kj0t6vg8bk6g0b.apps.googleusercontent.com",
        scope:
          "email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
        ux_mode: "popup",
      });
      await window.gapi.client.load("calendar", "v3");
      resolve({
        gapiAuth: window.gapi.auth2.getAuthInstance(),
        gapiCalendar: window.gapi.client.calendar,
      });
    });
  });

  yield put(gapiInitSuccess(gapiClients));
}

export function* watchGapi() {
  yield takeEvery(GAPI_INIT_REQUEST, gapiInit);
}
