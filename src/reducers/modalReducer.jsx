import { HIDE_MODAL, SHOW_MODAL } from "../types";

const INITIAL_STATE = {
  modalType: null,
  modalProps: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalType: null,
      };
    default:
      return state;
  }
};
