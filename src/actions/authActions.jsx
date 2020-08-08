import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_REQUEST,
  AUTH_CHECK_USER_REQUEST,
  AUTH_CHECK_USER_SUCCESS,
} from "../types";

// Authentication Actions.

export const checkAuthRequest = () => {
  return { type: AUTH_CHECK_USER_REQUEST };
};

export const checkAuthSuccess = () => {
  return { type: AUTH_CHECK_USER_SUCCESS };
};

export const signInRequest = () => {
  return { type: AUTH_SIGN_IN_REQUEST };
};

export const signInSuccess = (data) => {
  return {
    type: AUTH_SIGN_IN_SUCCESS,
    payload: data,
  };
};

export const signOutRequest = () => {
  return {
    type: AUTH_SIGN_OUT_REQUEST,
  };
};
export const signOutSuccess = () => {
  return {
    type: AUTH_SIGN_OUT_SUCCESS,
  };
};
