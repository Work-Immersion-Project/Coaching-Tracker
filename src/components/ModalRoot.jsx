import React from "react";
import { LoadingDialog, ConfirmationDialog, SuccessDialog } from "./dialogs";
import AddSubjectFormDialog from "./dialogs/AddSubjectFormDialog";
import { connect } from "react-redux";

const ModalRoot = ({ modalType, modalProps }) => {
  const openModal = modalType ? true : false;
  switch (modalType) {
    case "LOADING_MODAL":
      return <LoadingDialog open={openModal} {...modalProps} />;
    case "CONFIRMATION_MODAL":
      return <ConfirmationDialog open={openModal} {...modalProps} />;
    case "SUCCESS_MODAL":
      return <SuccessDialog open={openModal} {...modalProps} />;
    case "ADD_SUBJECT_FORM_MODAL":
      return <AddSubjectFormDialog open={openModal} {...modalProps} />;
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
