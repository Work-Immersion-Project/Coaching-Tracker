import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomScheduler from "./CustomScheduler";
import {
  openAddEventDrawer,
  showModal,
  hideModal,
  updateAppointmentTooltip,
  showAppointmentTooltip,
  hideAppointmentTooltip,
  updateCoachingScheduleStatusRequest,
  confirmCoachingScheduleRequest,
  acceptCoachingScheduleRequest,
} from "../../../actions";
import { coachingSessionStudentInstancesSelector } from "../../../selectors";
const CustomSchedulerContainer = ({ coachingSessions }) => {
  const dispatch = useDispatch();
  const showModal = useCallback(
    (type, props) => dispatch(showModal(type, props)),
    [dispatch]
  );
  const hideModal = useCallback(() => dispatch(hideModal()), [dispatch]);
  const updateCoachingScheduleRequest = useCallback(
    (sessionDetails) =>
      dispatch(updateCoachingScheduleStatusRequest(sessionDetails)),
    [dispatch]
  );
  const stateToProps = useSelector((state) => {
    return {
      loggedInUser: state.auth.data.user,
      studentInstances: coachingSessionStudentInstancesSelector(state),
    };
  });

  const dispatchToProps = {
    openAddEventDrawer: useCallback(
      (eventData) => dispatch(openAddEventDrawer(eventData)),
      [dispatch]
    ),

    acceptCoachingSchedule: useCallback(
      (sessionDetails) =>
        dispatch(acceptCoachingScheduleRequest(sessionDetails)),
      [dispatch]
    ),
    confirmCoachingSchedule: useCallback(
      (coachingSessionID) =>
        dispatch(confirmCoachingScheduleRequest(coachingSessionID)),
      [dispatch]
    ),
    updateAppointmentTooltip: useCallback(
      (appointmentMeta) => dispatch(updateAppointmentTooltip(appointmentMeta)),
      [dispatch]
    ),
    showAppointmentTooltip: useCallback(
      () => dispatch(showAppointmentTooltip()),
      [dispatch]
    ),
    hideAppointmentTooltip: useCallback(
      () => dispatch(hideAppointmentTooltip()),
      [dispatch]
    ),
  };
  const onDialogClose = () => {
    hideModal();
  };

  const onUpdateStatusButtonPressed = (id, status) => {
    let title = "";
    let content = "";
    if (status === "ongoing") {
      updateCoachingScheduleRequest({
        id,
        status,
      });
    } else {
      if (status === "pending") {
        title = "Accept Schedule Request?";
        content = "Are you sure that you are available at this date?";
      } else if (status === "cancelled") {
        title = "Cancel Schedule?";
        content = "Are you sure that you want to cancel this session?";
      } else if (status === "denied") {
        title = "Deny Schedule Request?";
        content = "Are you sure that you want to deny this session?";
      }
      showModal("CONFIRMATION_MODAL", {
        onDialogClose: onDialogClose,
        title,
        content,
        onNegativeClick: onDialogClose,
        onPositiveClick: () =>
          dispatchToProps.updateCoachingScheduleRequest({
            id,
            status,
          }),
      });
    }
  };
  return (
    <CustomScheduler
      {...dispatchToProps}
      {...stateToProps}
      coachingSessions={coachingSessions}
      onUpdateStatusButtonPressed={onUpdateStatusButtonPressed}
    />
  );
};

export default CustomSchedulerContainer;
