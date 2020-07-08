import React from "react";
import { LoadingDialog, ConfirmationDialog } from "./dialogs";
import { connect } from "react-redux";

const ModalRoot = ({ modalType, modalProps }) => {
  const openModal = modalType ? true : false;
  switch (modalType) {
    case "LOADING_MODAL":
      return <LoadingDialog open={openModal} {...modalProps} />;
    case "CONFIRMATION_MODAL":
      return <ConfirmationDialog open={openModal} {...modalProps} />;
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  return {
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps,
  };
};

export default connect(mapStateToProps)(ModalRoot);
