import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../types";

const INITIAL_STATE = {
  message: null,
  notificationType: null,
  isOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        isOpen: true,
        message: action.message,
        type: action.notificationType,
      };
    case HIDE_NOTIFICATION:
      return INITIAL_STATE;
    default:
      return state;
  }
};
