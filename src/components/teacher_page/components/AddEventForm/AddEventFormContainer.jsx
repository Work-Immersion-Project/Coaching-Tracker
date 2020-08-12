import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentsRequest,
  closeAddEventDrawer,
  hideModal,
  showModal,
  addCoachingScheduleRequest,
} from "../../../../actions";
import AddEventForm from "./AddEventForm";

const AddEventFormContainer = ({ selectedDate }) => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return { students: state.students.data };
  });

  const dispatchToProps = {
    getStudentsRequest: useCallback(
      (filterBySubject) => dispatch(getStudentsRequest(filterBySubject)),
      [dispatch]
    ),
    addCoachingSessionRequest: useCallback(
      (coachingDetails) =>
        dispatch(addCoachingScheduleRequest(coachingDetails)),
      [dispatch]
    ),
    closeAddEventDrawer: useCallback(() => dispatch(closeAddEventDrawer()), [
      dispatch,
    ]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
  };

  return (
    <AddEventForm
      {...dispatchToProps}
      {...stateToProps}
      selectedDate={selectedDate}
    />
  );
};

export default AddEventFormContainer;
