import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAddEventDrawer } from "../../../../actions";
import RequestEventDrawer from "./RequestEventDrawer";

const RequestEventDrawerContainer = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector((state) => {
    return {
      addEventDrawerData: state.drawer.addEventDrawer,
    };
  });
  const dispatchToProps = {
    closeAddEventDrawer: useCallback(() => dispatch(closeAddEventDrawer()), [
      dispatch,
    ]),
  };
  return <RequestEventDrawer {...stateToProps} {...dispatchToProps} />;
};

export default RequestEventDrawerContainer;
