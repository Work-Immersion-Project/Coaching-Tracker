import { SIGN_IN, SIGN_OUT } from "../types";
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
