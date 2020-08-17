import {
  AUTH_CHECK_USER_REQUEST,
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_OUT_REQUEST,
} from "../types";
import _ from "lodash";
import app from "../firebase";

import {
  checkAuthSuccess,
  signInSuccess,
  signInRequest,
  signOutSuccess,
  setError,
} from "../actions";
import { takeEvery, select, put } from "redux-saga/effects";
import { getGapiAuthClient } from "../selectors";
import axios from "../api";

/** Check the user if authenticated or not */

function* checkAuthSaga() {
  try {
    const gapiAuth = yield select(getGapiAuthClient);

    const currentUser = gapiAuth.currentUser.get().getBasicProfile();
    // If there is a user logged in
    if (gapiAuth.isSignedIn && currentUser) {
      const { access_token } = gapiAuth.currentUser.get().getAuthResponse();
      const response = yield axios.patch(
        `/auth/sign-in`,
        {
          profileURL: currentUser.getImageUrl(),
        },
        {
          params: {
            email: currentUser.getEmail(),
          },
        }
      );
      const user = response.data.data;

      if (_.isEmpty(user)) {
        yield put(setError("User Not Found!"));
        return;
      }

      if (user.type === "admin") {
        yield put(checkAuthSuccess());
        yield put(
          signInSuccess({
            isSignedIn: true,
            user: { ...user },
            userToken: access_token,
          })
        );
      } else {
        const userData = yield axios
          .get(`/${user.type}s/${currentUser.getEmail()}`)
          .then((r) => r.data);
        yield put(checkAuthSuccess());
        yield put(
          signInSuccess({
            isSignedIn: true,
            user: { ...userData, type: user.type },
            userToken: access_token,
          })
        );
      }
    } else {
      yield put(signInRequest());
    }
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* signInSaga() {
  const gapiAuth = yield select(getGapiAuthClient);
  try {
    yield gapiAuth.signIn({
      prompt: "select_account",
    });

    const currentUser = gapiAuth.currentUser.get().getBasicProfile();
    const { access_token } = gapiAuth.currentUser.get().getAuthResponse();

    const response = yield axios.patch(
      `/auth/sign-in`,
      {
        profileURL: currentUser.getImageUrl(),
      },
      {
        params: {
          email: currentUser.getEmail(),
        },
      }
    );
    const user = response.data.data;

    const userData = yield axios
      .get(`/${user.type}s/${currentUser.getEmail()}`)
      .then((r) => r.data);

    if (_.isEmpty(userData)) {
      return;
    }

    yield put(
      signInSuccess({
        isSignedIn: true,
        user: { ...userData, type: user.type },
        userToken: access_token,
      })
    );
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* signOutSaga() {
  const gapiAuthClient = select(getGapiAuthClient);
  try {
    yield gapiAuthClient.signOut();
    yield app.auth().signOut();
    yield put(signOutSuccess);
  } catch (error) {
    yield put(setError(error.message));
  }
}

export default function* watchAuth() {
  yield takeEvery(AUTH_CHECK_USER_REQUEST, checkAuthSaga);
  yield takeEvery(AUTH_SIGN_IN_REQUEST, signInSaga);
  yield takeEvery(AUTH_SIGN_OUT_REQUEST, signOutSaga);
}
