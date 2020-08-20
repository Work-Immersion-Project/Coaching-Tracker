import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmCoachingScheduleRequest,
  toggleTooltipVisibility,
  acceptCoachingScheduleRequest,
  updateCoachingScheduleStatusRequest,
  showModal,
  hideModal,
} from "../../../../actions";
import { currentUserSelector } from "../../../../selectors";
import { AppointmentTooltipContent } from "./AppointmentTooltipContent";
const AppointmentTooltipContentContainer = (schedulerProps) => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return {
      currentUser: currentUserSelector(state),
    };
  });

  const dispatchToProps = {
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    confirmCoachingSession: useCallback(
      (sessionDetails) =>
        dispatch(confirmCoachingScheduleRequest(sessionDetails)),
      [dispatch]
    ),
    updateCoachingSession: useCallback(
      (sessionDetails) =>
        dispatch(updateCoachingScheduleStatusRequest(sessionDetails)),
      [dispatch]
    ),
    acceptCoachingSession: useCallback(
      (sessionDetails) =>
        dispatch(acceptCoachingScheduleRequest(sessionDetails)),
      [dispatch]
    ),
    toggleTooltipVisibility: useCallback(
      (isVisible) => dispatch(toggleTooltipVisibility(isVisible)),
      [dispatch]
    ),
  };

  return (
    <AppointmentTooltipContent
      {...stateToProps}
      {...dispatchToProps}
      {...schedulerProps}
    />
  );
};

export default AppointmentTooltipContentContainer;
