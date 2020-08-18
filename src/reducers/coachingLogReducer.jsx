import { GET_COACHING_LOGS_SUCCESS, GET_COACHING_LOGS_REQUEST } from "../types";

const INITIAL_STATE = {
  data: [],
  isLoading: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COACHING_LOGS_REQUEST:
      return { ...state };
    case GET_COACHING_LOGS_SUCCESS:
      return { ...state, data: action.data, isLoading: true };
    default:
      return state;
  }
};
