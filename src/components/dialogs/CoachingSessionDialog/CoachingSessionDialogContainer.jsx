import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoachingSessionDialog from "./CoachingSessionDialog";

const CoachingSessionDialogContainer = ({ open, ...modalProps }) => {
  return <CoachingSessionDialog open={open} {...modalProps} />;
};

export default CoachingSessionDialogContainer;
