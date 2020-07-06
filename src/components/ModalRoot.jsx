import React from "react";
import LoadingDialog from "./dialogs/LoadingDialog";
import { connect } from "react-redux";
import CustomAlertDialog from "./custom/CustomAlertDialog";

const ModalRoot = ({ modalType, modalProps }) => {
  if (modalType === "LOADING_MODAL") {
    return <LoadingDialog open={modalType ? true : false} {...modalProps} />;
  }

  return <CustomAlertDialog open={modalType ? true : false} {...modalProps} />;
};

const mapStateToProps = (state) => {
  return {
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps,
  };
};

export default connect(mapStateToProps)(ModalRoot);
