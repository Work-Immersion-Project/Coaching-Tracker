import { GAPI_INIT_REQUEST, GAPI_INIT_SUCCESS } from "../types";

export const gapiInitRequest = () => {
  return { type: GAPI_INIT_REQUEST };
};

export const gapiInitSuccess = (data) => {
  return { type: GAPI_INIT_SUCCESS, payload: data };
};
