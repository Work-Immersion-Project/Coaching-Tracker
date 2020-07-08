import {
  COACHING_LIST_CLEAR,
  COACHING_LIST_STUDENT_ADD,
  COACHING_LIST_STUDENT_REMOVE,
} from "../types";

const INITIAL_STATE = {
  coachingList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COACHING_LIST_STUDENT_ADD:
      return {
        ...state,
        coachingList: [...state.coachingList, action.payload],
      };
    case COACHING_LIST_STUDENT_REMOVE:
      return {
        ...state,
        coachingList: state.coachingList.filter(
          (student) => student.name !== action.payload.name
        ),
      };
    case COACHING_LIST_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
