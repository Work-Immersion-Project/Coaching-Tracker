import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutRequest, hideModal, closeDrawer } from "../../../actions";
import TeacherDrawer from "./TeacherDrawer";

const TeacherDrawerContainer = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector((state) => {
    return {
      isDrawerOpen: state.drawer.navigationDrawer.isOpen,
    };
  });

  const dispatchToProps = {
    signOut: useCallback(() => dispatch(signOutRequest()), [dispatch]),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    closeDrawer: useCallback(() => dispatch(closeDrawer())),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
  };

  return <TeacherDrawer {...dispatchToProps} {...stateToProps} />;
};

export default TeacherDrawerContainer;
