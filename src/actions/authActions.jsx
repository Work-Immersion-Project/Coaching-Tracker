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
// Authentication Actions.
const db = app.firestore();
const userCollection = db.collection("users");

export const signIn = (email, uid, userToken) => async (dispatch) => {
  dispatch(signInRequest());

  try {
    const document = await userCollection.doc(uid).get();

    if (_.isEmpty(document.data())) {
      dispatch(signInError("User is not registered"));
    } else {
      dispatch(
        signInSuccess({
          isSignedIn: true,
          user: document.data(),
          userToken,
        })
      );
    }
  } catch (error) {
    dispatch(signInError(error.message));
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

export const signOut = () => async (dispatch) => {
  dispatch(signOutRequest);
  try {
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
