import {
  GET_SUBJECT_FIELDS_SUCCESS,
  GET_SUBJECT_FIELDS_REQUEST,
} from "../types";

const INITIAL_STATE = {
  data: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUBJECT_FIELDS_REQUEST:
      return { ...state };
    case GET_SUBJECT_FIELDS_SUCCESS:
      return {
        ...state,
        data: {
          subjectFields: action.data,
        },
      };
    default:
      return state;
  }
};
