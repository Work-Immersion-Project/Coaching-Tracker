import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import TeacherSchedules from "./TeacherSchedules";
import { showModal, hideModal } from "../../../actions";

const TeacherSchedulesContainer = (props) => {
  const dispatch = useDispatch();

  const dispatchToProps = {
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
  };

  const stateToProps = useSelector((state) => {
    return {
      coachingSessions: state.coaching.coachingSchedules,
      isLoading: state.coaching.isLoading,
    };
  });

  return <TeacherSchedules {...stateToProps} {...dispatchToProps} {...props} />;
};

export default TeacherSchedulesContainer;
