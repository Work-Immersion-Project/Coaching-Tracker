import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_REQUEST,
} from "../types";
import _ from "lodash";
import app from "../firebase";
import firebase from "firebase";
// Authentication Actions.
const db = app.firestore();
const userCollection = db.collection("users");

export const checkAuth = () => async (dispatch, getState) => {
  const gapiAuth = getState().gapi.gapiAuth;
  const currentUser = app.auth().currentUser;
  console.log(currentUser);
  if (currentUser) {
    const { access_token } = gapiAuth.currentUser.get().getAuthResponse();
    const document = await userCollection.doc(currentUser.uid).get();
    if (_.isEmpty(document.data())) {
      dispatch(signInError("User is not registered"));
    } else {
      dispatch(
        signInSuccess({
          isSignedIn: true,
          user: document.data(),
          userToken: access_token,
        })
      );
    }
  } else {
    dispatch(signIn(gapiAuth));
  }
};

export const signIn = () => async (dispatch, getState) => {
  const gapiAuth = getState().gapi.gapiAuth;
  dispatch(signInRequest());
  try {
    await gapiAuth.signIn({
      prompt: "select_account",
    });

    const currentUser = gapiAuth.currentUser.get();
    const { access_token, id_token } = currentUser.getAuthResponse();
    const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

    await app.auth().signInWithCredential(credential);

    const user = app.auth().currentUser;
    const document = await userCollection.doc(user.uid).get();
    if (_.isEmpty(document.data())) {
      dispatch({
        error: "User is not registered",
      });
    } else {
      dispatch(
        signInSuccess({
          isSignedIn: true,
          user: document.data(),
          userToken: access_token,
        })
      );
    }
  } catch (error) {
    dispatch({ ...error, type: "SIGN_IN_ERROR" });
  }
};

export const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
    data: null,
    error: null,
  };
};

export const signInSuccess = (results) => {
  return { type: SIGN_IN_SUCCESS, data: results, error: null };
};
export const signInError = (error) => {
  return { type: SIGN_IN_ERROR, data: null, error: error };
};

export const signOut = () => async (dispatch, getState) => {
  const gapiAuth = getState().gapi.gapiAuth;
  dispatch(signOutRequest);

  try {
    await gapiAuth.signOut();
    await app.auth().signOut();
    dispatch(
      signOutSuccess({
        isSignedIn: false,
      })
    );
  } catch (error) {
    dispatch(signOutError(error.message));
  }
};

export const signOutRequest = () => {
  return {
    type: SIGN_OUT_REQUEST,
    data: null,
    error: null,
  };
};
export const signOutSuccess = (results) => {
  return {
    type: SIGN_OUT_SUCCESS,
    data: results,
    error: null,
  };
};
export const signOutError = (error) => {
  return {
    type: SIGN_OUT_ERROR,
    data: null,
    error: error,
  };
};
