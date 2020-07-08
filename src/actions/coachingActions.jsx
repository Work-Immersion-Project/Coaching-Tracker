import {
  COACHING_LIST_CLEAR,
  COACHING_LIST_STUDENT_ADD,
  COACHING_LIST_STUDENT_REMOVE,
} from "../types";

export const coachingListStudentAdd = (student) => {
  return {
    type: COACHING_LIST_STUDENT_ADD,
    payload: student,
  };
};

export const coachingListStudentRemove = (student) => {
  return {
    type: COACHING_LIST_STUDENT_REMOVE,
    payload: student,
  };
};

export const coachingListClear = () => {
  return { type: COACHING_LIST_CLEAR };
};
