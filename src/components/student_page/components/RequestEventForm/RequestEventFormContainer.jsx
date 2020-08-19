import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeachersRequest,
  showModal,
  hideModal,
  requestCoachingScheduleRequest,
  closeAddEventDrawer,
  getTeacherFieldsRequest,
} from "../../../../actions";
import RequestEventForm from "./RequestEventForm";
import { useState } from "react";
import { currentUserSelector } from "../../../../selectors";

const RequestEventFormContainer = ({ selectedDate }) => {
  const [isTeacherListOpen, setTeacherListState] = useState(false);

  const dispatch = useDispatch();
  const dispatchToProps = {
    getTeacherFields: useCallback(
      (subjectID) => dispatch(getTeacherFieldsRequest(subjectID)),
      [dispatch]
    ),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    requestCoachingSession: useCallback(
      (coachingDetails) =>
        dispatch(requestCoachingScheduleRequest(coachingDetails)),
      [dispatch]
    ),
    closeAddEventDrawer: useCallback(() => dispatch(closeAddEventDrawer()), [
      dispatch,
    ]),
  };
  const stateToProps = useSelector((state) => {
    return {
      teachers: state.fields.data.teacherFields,
      enrolledSubjects: currentUserSelector(state).enrolledSubjects,
    };
  });

  return (
    <RequestEventForm
      {...stateToProps}
      {...dispatchToProps}
      selectedDate={selectedDate}
      isTeacherListOpen={isTeacherListOpen}
      setTeacherListState={setTeacherListState}
    />
  );
};

export default RequestEventFormContainer;
