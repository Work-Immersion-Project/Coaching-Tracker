import app from "../firebase";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
  GET_USER,
  CHECK_USER,
  INITIALIZE_GAPI,
} from "./types";
const db = app.firestore();
const userCollection = db.collection("users");
// Authentication Actions.
export const signIn = () => async (dispatch) => {
  dispatch({
    type: SIGN_IN,
  });
};
export const signOut = () => async (dispatch) => {
  dispatch({
    type: SIGN_OUT,
  });
};

// User Actions
export const getUser = (email, uid, userToken) => async (dispatch) => {
  const document = await userCollection.doc(uid).get();
  dispatch({
    type: GET_USER,
    payload: { currentUser: { ...document.data() }, userToken },
  });
};

export const addUser = (userId, email, name, type, userToken) => async (
  dispatch
) => {
  await userCollection.doc(userId).set({
    userId: userId,
    email: email,
    name: name,
    type: type,
  });
  dispatch({
    type: ADD_USER,
    payload: {
      currentUser: { userId, email, name, type },
      userToken,
    },
  });
};

export const initializeGapiAuth = () => async (dispatch) => {
  window.gapi.load("client:auth2", async () => {
    await window.gapi.client.init({
      clientId:
        "347125005886-kt2hubgo6bljk7m9q0kj0t6vg8bk6g0b.apps.googleusercontent.com",
      scope: "email https://www.googleapis.com/auth/calendar",
      ux_mode: "popup",
    });
    dispatch({
      type: INITIALIZE_GAPI,
      payload: window.gapi.auth2.getAuthInstance(),
    });
  });
};
