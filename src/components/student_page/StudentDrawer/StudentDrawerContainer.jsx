import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal, signOutRequest } from "../../../actions";
import { unseenNotificationsSelector } from "../../../selectors";
import StudentDrawer from "./StudentDrawer";

const StudentDrawerContainer = () => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return {
      notifications: unseenNotificationsSelector(state),
    };
  });

  const dispatchToProps = {
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    signOut: useCallback(() => dispatch(signOutRequest()), [dispatch]),
  };

  return <StudentDrawer {...dispatchToProps} {...stateToProps} />;
};

export default StudentDrawerContainer;
