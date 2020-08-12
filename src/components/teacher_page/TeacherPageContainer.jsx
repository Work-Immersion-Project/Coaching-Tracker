import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getCoachingSchedulesRequest } from "../../actions";
import TeacherPage from "./TeacherPage";

const TeacherPageContainer = () => {
  const dispatch = useDispatch();
  const dispatchToProps = {
    getCoachingSchedulesRequest: useCallback(
      (isStudent) => dispatch(getCoachingSchedulesRequest(isStudent)),
      [dispatch]
    ),
  };

  return <TeacherPage {...dispatchToProps} />;
};

export default TeacherPageContainer;
