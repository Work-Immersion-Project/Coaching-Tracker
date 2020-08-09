import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { registerUserRequest, showModal, hideModal } from "../../../actions";
import AdminRegistration from "./AdminRegistration";

const AdminRegistrationContainer = () => {
  const dispatch = useDispatch();
  const dispatchToProps = {
    registerUserRequest: useCallback(
      (formValues) => dispatch(registerUserRequest(formValues)),
      [dispatch]
    ),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
  };
  return <AdminRegistration {...dispatchToProps} />;
};

export default AdminRegistrationContainer;
