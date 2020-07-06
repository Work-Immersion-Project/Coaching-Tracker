import { HIDE_ERROR } from "../types/errorTypes";

const INITIAL_STATE = {
  error: null,
  isOpen: false,
};

export const errorReducer = (state = INITIAL_STATE, action) => {
  const { error } = action;

  if (error) {
    return {
      error: error,
      isOpen: true,
    };
  } else if (action.type === HIDE_ERROR) {
    return {
      error: null,
      isOpen: false,
    };
  }
  return state;
};
