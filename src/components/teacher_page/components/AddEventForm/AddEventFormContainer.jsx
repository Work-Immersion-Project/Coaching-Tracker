import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAddEventDrawer,
  hideModal,
  showModal,
  addCoachingScheduleRequest,
  getStudentFieldsRequest,
} from "../../../../actions";
import AddEventForm from "./AddEventForm";
import { currentUserSelector } from "../../../../selectors";

const AddEventFormContainer = ({ selectedDate }) => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return {
      students: state.fields.data.studentFields,
      handledSubjects: currentUserSelector(state).handledSubjects,
    };
  });

  const dispatchToProps = {
    getStudentFields: useCallback(
      (subjectID) => dispatch(getStudentFieldsRequest(subjectID)),
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
