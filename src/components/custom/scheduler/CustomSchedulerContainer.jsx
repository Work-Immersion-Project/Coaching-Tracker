import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomScheduler from "./CustomScheduler";
import {
  openAddEventDrawer,
  showModal,
  hideModal,
  confirmCoachingSchedule,
  updateAppointmentTooltip,
  showAppointmentTooltip,
  hideAppointmentTooltip,
  updateCoachingScheduleStatusRequest,
  confirmCoachingScheduleRequest,
} from "../../../actions";
const CustomSchedulerContainer = () => {
  const dispatch = useDispatch();
  const [visible, setVisibility] = useState(false);
  const [appointmentMeta, setAppointmentMeta] = useState({
    data: {},
    target: null,
  });
  const stateToProps = useSelector((state) => {
    return {
      coachingSessions: state.coaching.coachingSchedules,
      loggedInUser: state.auth.data.user,
      tooltip: {
        appointmentMeta,
        visible,
      },
    };
  });

  const dispatchToProps = {
    openAddEventDrawer: useCallback(
      (eventData) => dispatch(openAddEventDrawer(eventData)),
      [dispatch]
    ),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    updateCoachingScheduleRequest: useCallback(
      (sessionDetails) =>
        dispatch(updateCoachingScheduleStatusRequest(sessionDetails)),
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

  const handleAppointmentMetaChange = (appointmentMeta) => {
    setAppointmentMeta(appointmentMeta);
  };

  const handleVisibilityChange = (isVisible) => {
    setVisibility(isVisible);
  };

  return (
    <CustomScheduler
      {...dispatchToProps}
      {...stateToProps}
      updateAppointmentMeta={handleAppointmentMetaChange}
      updateVisibility={handleVisibilityChange}
    />
  );
};

export default CustomSchedulerContainer;
