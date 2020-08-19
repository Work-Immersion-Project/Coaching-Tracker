import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTooltipVisibility,
  updateAppointmentMeta,
} from "../../../../actions";
import Appointment from "./Appointment";

const AppointmentContainer = (schedulerProps) => {
  const dispatch = useDispatch();

  const dispatchToProps = {
    toggleTooltipVisibility: useCallback(
      (isVisible) => dispatch(toggleTooltipVisibility(isVisible)),
      [dispatch]
    ),
    updateAppointmentMeta: useCallback(
      (appointmentMeta) => dispatch(updateAppointmentMeta(appointmentMeta)),
      [dispatch]
    ),
  };

  const stateToProps = useSelector((state) => {
    return {
      tooltip: state.scheduler.appointmentTooltip,
    };
  });
  return (
    <Appointment {...dispatchToProps} {...stateToProps} {...schedulerProps} />
  );
};

export default AppointmentContainer;
