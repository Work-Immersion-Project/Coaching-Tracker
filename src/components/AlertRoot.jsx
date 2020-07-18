import React from "react";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { hideAlert, hideError } from "../actions";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;
const AlertRoot = ({ isOpen, message, type, error, hideAlert, hideError }) => {
  const onClose = () => {
    hideAlert();
    hideError();
  };

  if (error) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={onClose}
        open={true}
      >
        <Alert onClose={onClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    );
  }
  switch (type) {
    case "SUCCESS":
      return (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={onClose}
          open={isOpen}
        >
          <Alert onClose={onClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      );
    case "NOTIFY":
      return (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2000}
          onClose={onClose}
          open={isOpen}
        >
          <Alert onClose={onClose} severity="info">
            {message}
          </Alert>
        </Snackbar>
      );
    default:
      return null;
  }
};

const mapStateToProps = ({ alerts, errors }) => {
  return {
    isOpen: alerts.isOpen,
    type: alerts.type,
    message: alerts.message,
    error: errors.errorMessage,
  };
};

export default connect(mapStateToProps, {
  hideAlert,
  hideError,
})(AlertRoot);
