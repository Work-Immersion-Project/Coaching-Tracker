import { SET_ERROR, HIDE_ERROR } from "../types";

export const setError = (error) => {
  console.log(error);
  return {
    type: SET_ERROR,
    error: error,
  };
};

export const hideError = () => {
  return {
    type: HIDE_ERROR,
  };
};
