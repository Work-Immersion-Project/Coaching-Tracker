import { CLOSE_DRAWER, OPEN_DRAWER } from "../types";

export default (state = false, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return true;
    case CLOSE_DRAWER:
      return false;
    default:
      return state;
  }
};
