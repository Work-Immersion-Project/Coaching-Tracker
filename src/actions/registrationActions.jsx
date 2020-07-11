import {
  GET_REGISTRATION_FIELDS_REQUEST,
  GET_REGISTRATION_FIELDS_SUCCESS,
} from "../types";
import app from "../firebase";
const db = app.firestore();

export const getRegistrationFields = () => async (dispatch) => {};

export const getRegistrationFieldsRequest = () => {
  return {
    type: GET_REGISTRATION_FIELDS_REQUEST,
  };
};
export const getRegistrationFieldsSuccess = (results) => {
  return {
    type: GET_REGISTRATION_FIELDS_SUCCESS,
    data: results,
  };
};
