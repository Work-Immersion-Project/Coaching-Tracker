import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  UPDATE_USER,
  REMOVE_USER,
  GET_USER,
  CHECK_USER,
} from "../types";
import app from "../firebase";
const db = app.firestore();
const userCollection = db.collection("users");

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
  dispatch(addUserRequest());
  try {
    await userCollection.doc(userId).set({
      userId: userId,
      email: email,
      name: name,
      type: type,
    });
    dispatch(
      addUserSuccess({
        userId,
        email,
        name,
        type,
        userToken,
      })
    );
  } catch (error) {
    dispatch(addUserError(error.message));
  }
};

export const addUserRequest = () => {
  return {
    type: ADD_USER_REQUEST,
  };
};

export const addUserSuccess = (results) => {
  return {
    type: ADD_USER_SUCCESS,
    data: results,
    error: null,
  };
};
export const addUserError = (error) => {
  return {
    type: ADD_USER_ERROR,
    data: null,
    error: error,
  };
};
