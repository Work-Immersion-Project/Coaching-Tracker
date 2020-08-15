import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjectsRequest,
  addSubjectRequest,
  hideModal,
  showModal,
} from "../../../actions";
import ManageSubjectsPage from "./ManageSubjectsPage";

const ManageSubjectsPageContainer = () => {
  const dispatch = useDispatch();
  const mapStateToProps = useSelector((state) => {
    return {
      subjects: state.subjects.data,
    };
  });
  const mapDispatchToProps = {
    getSubjects: useCallback(() => dispatch(getSubjectsRequest()), [dispatch]),
    addSubject: useCallback(
      (subjectDetails) => dispatch(addSubjectRequest(subjectDetails)),
      [dispatch]
    ),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
  };

  return <ManageSubjectsPage {...mapStateToProps} {...mapDispatchToProps} />;
};
export default ManageSubjectsPageContainer;
