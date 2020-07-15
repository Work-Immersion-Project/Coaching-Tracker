import React from "react";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { hideNotification, hideError } from "../actions";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;
const NotificationRoot = ({
  isOpen,
  message,
  type,
  error,
  hideNotification,
  hideError,
}) => {
  const onClose = () => {
    hideNotification();
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
    default:
      return null;
  }
};

const mapStateToProps = ({ notification, errors }) => {
  return {
    isOpen: notification.isOpen,
    type: notification.type,
    message: notification.message,
    error: errors.errorMessage,
  };
};

export default connect(mapStateToProps, {
  hideNotification,
  hideError,
})(NotificationRoot);
