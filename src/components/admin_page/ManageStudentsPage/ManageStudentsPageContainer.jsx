import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentsRequest,
  hideModal,
  showModal,
  assignStudentsSubjectsRequest,
  removeStudentSubjectRequest,
} from "../../../actions";
import ManageStudentsPage from "./ManageStudentsPage";

const ManageStudentsPageContainer = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector((state) => {
    return { students: state.students.data };
  });

  const dispatchToProps = {
    getStudentsRequest: useCallback(
      (subjectName = null) => dispatch(getStudentsRequest(subjectName)),
      [dispatch]
    ),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    assignStudentSubject: useCallback(
      (studentDetails) =>
        dispatch(assignStudentsSubjectsRequest(studentDetails)),
      [dispatch]
    ),
    removeStudentSubjectRequest: useCallback(
      (studentDetails) => dispatch(removeStudentSubjectRequest(studentDetails)),
      [dispatch]
    ),
  };
  return <ManageStudentsPage {...dispatchToProps} {...stateToProps} />;
};

export default ManageStudentsPageContainer;
