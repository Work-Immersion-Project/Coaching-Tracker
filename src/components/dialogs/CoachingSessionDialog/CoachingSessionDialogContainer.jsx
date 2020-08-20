import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoachingSessionDialog from "./CoachingSessionDialog";
import { currentUserSelector } from "../../../selectors";
import {
  getCoachingScheduleRequest,
  updateCoachingScheduleStatusRequest,
} from "../../../actions";

const CoachingSessionDialogContainer = ({
  open,
  selectedCoachingSessionID,
  ...modalProps
}) => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return {
      currentUser: currentUserSelector(state),
      coachingSession: state.coaching.selectedCoachingSchedule,
    };
  });

  const dispatchToProps = {
    getCoachingSession: useCallback(
      (coachingSessionID) =>
        dispatch(getCoachingScheduleRequest(coachingSessionID)),
      [dispatch]
    ),
    updateCoachingSession: useCallback(
      (coachingSessionID, status) =>
        dispatch(
          updateCoachingScheduleStatusRequest({ coachingSessionID, status })
        ),
      [dispatch]
    ),
  };

  return (
    <CoachingSessionDialog
      open={open}
      {...modalProps}
      selectedCoachingSessionID={selectedCoachingSessionID}
      {...dispatchToProps}
      {...stateToProps}
    />
  );
};

export default CoachingSessionDialogContainer;
