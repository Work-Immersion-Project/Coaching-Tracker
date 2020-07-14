import {
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_REQUEST,
  GET_SUBJECTS_SUCCESS,
  GET_SUBJECTS_REQUEST,
} from "../types";

const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SUBJECT_REQUEST:
      return { ...state };
    case ADD_SUBJECT_SUCCESS:
      return { ...state };
    case GET_SUBJECTS_REQUEST:
      return { ...state };
    case GET_SUBJECTS_SUCCESS:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
