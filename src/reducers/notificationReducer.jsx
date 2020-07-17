import { GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS } from "../types";
const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return { ...state };
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
