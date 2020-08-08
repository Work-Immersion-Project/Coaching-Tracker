import {
  REGISTRATION_REGISTER_USER_REQUEST,
  REGISTRATION_REGISTER_USER_SUCCESS,
} from "../types";

export const registerUserRequest = (formValues) => {
  return {
    type: REGISTRATION_REGISTER_USER_REQUEST,
    payload: formValues,
  };
};
export const registerUserSuccess = () => {
  return {
    type: REGISTRATION_REGISTER_USER_SUCCESS,
  };
};
