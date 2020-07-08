import React from "react";
import { Modal, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loadingDialog: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIndicator: {
    outline: 0,
  },
}));

export const LoadingDialog = ({ onDialogClose, open }) => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.loadingDialog}
      open={open}
      onClose={onDialogClose}
    >
      <CircularProgress className={classes.loadingIndicator} />
    </Modal>
  );
};
