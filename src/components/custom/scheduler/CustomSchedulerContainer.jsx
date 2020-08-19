import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomScheduler from "./CustomScheduler";
import {
  openAddEventDrawer,
  updateAppointmentMeta,
  toggleTooltipVisibility,
} from "../../../actions";
import { coachingSessionStudentInstancesSelector } from "../../../selectors";
const CustomSchedulerContainer = ({ coachingSessions }) => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return {
      loggedInUser: state.auth.data.user,
      studentInstances: coachingSessionStudentInstancesSelector(state),
      tooltip: state.scheduler.appointmentTooltip,
    };
  });

  const dispatchToProps = {
    openAddEventDrawer: useCallback(
      (eventData) => dispatch(openAddEventDrawer(eventData)),
      [dispatch]
    ),

    toggleTooltipVisibility: useCallback(
      (isVisible) => dispatch(toggleTooltipVisibility(isVisible)),
      [dispatch]
    ),
    updateAppointmentMeta: useCallback(
      (appointmentMeta) => dispatch(updateAppointmentMeta(appointmentMeta)),
      [dispatch]
    ),
  };

  return (
    <CustomScheduler
      {...dispatchToProps}
      {...stateToProps}
      coachingSessions={coachingSessions}
    />
  );
};

export default CustomSchedulerContainer;
