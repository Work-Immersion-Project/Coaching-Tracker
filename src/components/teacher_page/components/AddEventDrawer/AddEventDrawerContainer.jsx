import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAddEventDrawer } from "../../../../actions";
import AddEventDrawer from "./AddEventDrawer";

const AddEventDrawerContainer = () => {
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

  return <AddEventDrawer {...stateToProps} {...dispatchToProps} />;
};
export default AddEventDrawerContainer;
