import { HIDE_ERROR, SET_ERROR } from "../types/errorTypes";

const INITIAL_STATE = {
  errorMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  const { error } = action;

  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        errorMessage: error,
      };
    }
    case HIDE_ERROR: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
};
