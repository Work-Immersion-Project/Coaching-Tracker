import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: "#222222",
  },
  contentText: {
    color: "white",
  },
}));

export const ConfirmationDialog = ({
  open,
  title,
  content,
  onDialogClose,
  onPositiveClick,
  onNegativeClick,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogContent className={classes.content}>
        <DialogTitle className={classes.contentText}>{title}</DialogTitle>
        <DialogContentText className={classes.contentText}>
          {content}
        </DialogContentText>
        <DialogActions>
          <Button onClick={onNegativeClick} className={classes.contentText}>
            Cancel
          </Button>
          <Button onClick={onPositiveClick} className={classes.contentText}>
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
