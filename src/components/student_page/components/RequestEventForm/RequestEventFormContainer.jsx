import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeachersRequest,
  showModal,
  hideModal,
  requestCoachingScheduleRequest,
  closeAddEventDrawer,
} from "../../../../actions";
import RequestEventForm from "./RequestEventForm";

const RequestEventFormContainer = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const dispatchToProps = {
    getTeachers: useCallback(
      (bySubject) => dispatch(getTeachersRequest(bySubject)),
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
      teachers: state.teachers.data,
    };
  });

  return (
    <RequestEventForm
      {...stateToProps}
      {...dispatchToProps}
      selectedDate={selectedDate}
    />
  );
};

export default RequestEventFormContainer;
