import { HIDE_ERROR } from "../types/errorTypes";

const INITIAL_STATE = {
  errorMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  const { error } = action;
  if (error) {
    return {
      errorMessage: error,
    };
  } else if (action.type === HIDE_ERROR) {
    return INITIAL_STATE;
  }
  return state;
};
