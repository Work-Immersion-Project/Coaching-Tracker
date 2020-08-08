import {
  AUTH_CHECK_USER_REQUEST,
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_OUT_REQUEST,
} from "../types";
import _ from "lodash";
import app, { db, collections } from "../firebase";
import firebase from "firebase";
import {
  checkAuthSuccess,
  signInSuccess,
  signInRequest,
  signOutSuccess,
  setError,
} from "../actions";
import { takeEvery, select, call, put } from "redux-saga/effects";
import { getGapiAuthClient } from "../selectors";

/** Check the user if authenticated or not */

function* checkAuthSaga() {
  const gapiAuth = yield select(getGapiAuthClient);
  const currentUser = app.auth().currentUser;

  // If there is a user logged in
  if (currentUser) {
    const { access_token } = gapiAuth.currentUser.get().getAuthResponse();
    const userData = yield collections["user"]
      .doc(currentUser.email)
      .get()
      .then((doc) => doc.data());
    if (_.isEmpty(userData)) {
      yield put(setError("User Not Found!"));
      return;
    }
    // Fetch the corresponding data
    const userDocRef = yield collections[userData.type].doc(currentUser.email);
    const currentDate = new Date();

    yield userDocRef.update({
      "metadata.lastLoggedIn": currentDate,
    });

    const userDoc = yield userDocRef.get().then((doc) => doc.data());
    yield put(checkAuthSuccess());

    yield put(
      signInSuccess({
        isSignedIn: true,
        user: { ...userDoc, type: userData.type },
        userToken: access_token,
      })
    );
  } else {
    yield put(signInRequest());
  }
}

function* signInSaga() {
  const gapiAuth = yield select(getGapiAuthClient);
  try {
    yield gapiAuth.signIn({
      prompt: "select_account",
    });

    const currentUser = gapiAuth.currentUser.get();
    const { access_token, id_token } = currentUser.getAuthResponse();
    const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
    yield app.auth().signInWithCredential(credential);

    const fbUser = app.auth().currentUser;
    const userData = yield collections["user"]
      .doc(fbUser.email)
      .get()
      .then((doc) => doc.data());

    if (_.isEmpty(userData)) {
      return;
    }

    const userDocRef = collections[userData.type].doc(fbUser.email);
    const currentDate = new Date();
    yield userDocRef.update({
      "metadata.lastLoggedIn": currentDate,
    });
    const updatedUserData = yield userDocRef.get().then((doc) => doc.data());
    yield put(
      signInSuccess({
        isSignedIn: true,
        user: { ...updatedUserData, type: userData.type },
        userToken: access_token,
      })
    );
  } catch (error) {
    yield put(setError(error.error));
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
