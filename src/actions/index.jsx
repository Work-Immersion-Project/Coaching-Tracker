import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = (email, pass) => {
  return {
    type: SIGN_IN,
    payload: {
      email,
      pass,
    },
  };
};
