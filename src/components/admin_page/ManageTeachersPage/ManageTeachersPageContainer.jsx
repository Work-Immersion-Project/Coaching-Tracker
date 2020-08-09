import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeachersRequest,
  hideModal,
  showModal,
  assignSubjectToTeacherRequest,
  removeSubjectFromTeacherRequest,
} from "../../../actions";
import ManageTeachersPage from "./ManageTeachersPage";

const ManageTeachersPageContainer = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector((state) => {
    return {
      teachers: state.teachers.data,
    };
  });

  const dispatchToProps = {
    getTeachersRequest: useCallback(
      (filterBySubj) => dispatch(getTeachersRequest(filterBySubj)),
      [dispatch]
    ),
    assignSubjectToTeacherRequest: useCallback(
      (subjectDetails) =>
        dispatch(assignSubjectToTeacherRequest(subjectDetails))[dispatch]
    ),
    removeSubjectFromTeacherRequest: useCallback(
      (subjectDetails) =>
        dispatch(removeSubjectFromTeacherRequest(subjectDetails)),
      [dispatch]
    ),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
  };

  return <ManageTeachersPage {...stateToProps} {...dispatchToProps} />;
};

export default ManageTeachersPageContainer;
