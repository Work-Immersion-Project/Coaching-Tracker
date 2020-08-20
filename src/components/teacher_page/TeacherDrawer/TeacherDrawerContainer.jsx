import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutRequest,
  hideModal,
  closeDrawer,
  showModal,
} from "../../../actions";
import TeacherDrawer from "./TeacherDrawer";
import { unseenNotificationsSelector } from "../../../selectors";

const TeacherDrawerContainer = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector((state) => {
    return {
      isDrawerOpen: state.drawer.navigationDrawer.isOpen,
      notifications: unseenNotificationsSelector(state),
    };
  });

  const dispatchToProps = {
    signOut: useCallback(() => dispatch(signOutRequest()), [dispatch]),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    closeDrawer: useCallback(() => dispatch(closeDrawer()), [dispatch]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
  };

  return <TeacherDrawer {...dispatchToProps} {...stateToProps} />;
};

export default TeacherDrawerContainer;
