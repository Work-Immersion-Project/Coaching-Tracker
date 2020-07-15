import React from "react";
import { connect } from "react-redux";
import { hideError } from "../actions";
import { Snackbar } from "@material-ui/core";

const ErrorNotification = (props) => {
  const handleClose = () => {
    props.hideError();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={props.isOpen}
      onClose={handleClose}
      message={props.errorMessage}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errors.error,
    isOpen: state.errors.isOpen,
  };
};

export default connect(mapStateToProps, {
  hideError,
})(ErrorNotification);
