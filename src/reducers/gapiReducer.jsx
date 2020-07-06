import { INITIALIZE_GAPI } from "../types";

const INITIAL_STATE = {
  gapiAuth: null,
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === INITIALIZE_GAPI) {
    return {
      ...state,
      gapiAuth: action.payload,
    };
  }
  return state;
};
