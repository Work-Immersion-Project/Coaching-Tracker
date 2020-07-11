import {
  ADD_USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER,
  REMOVE_USER,
  CHECK_USER,
} from "../types";
import { db } from "../firebase";
import { showModal, hideModal } from "./";

const userCollection = db.collection("users");

// User Actions
export const getUser = (email, uid) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const document = await userCollection.doc(uid).get();
    dispatch(
      getUserSuccess({
        ...document.data(),
      })
    );
  } catch (error) {
    dispatch(getUserError(error.message));
  }
};

export const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST,
  };
};
export const getUserSuccess = (results) => {
  return {
    type: GET_USER_SUCCESS,
    data: results,
    error: null,
  };
};
export const getUserError = (error) => {
  return {
    type: GET_USER_ERROR,
    data: null,
    error: error,
  };
};

export const addUser = ({ email, type }) => async (dispatch) => {
  dispatch(addUserRequest());
  try {
    await userCollection.doc(email).set({
      type: type,
    });

    dispatch(addUserSuccess());
  } catch (error) {
    dispatch(addUserError(error.message));
  }
};

export const addUserRequest = () => {
  return {
    type: ADD_USER_REQUEST,
  };
};

export const addUserSuccess = () => {
  return {
    type: ADD_USER_SUCCESS,
  };
};
export const addUserError = (error) => {
  return {
    type: ADD_USER_ERROR,
    data: null,
    error: error,
  };
};
