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

const useStyles = makeStyles(() => ({
  content: {
    backgroundColor: "#222222",
  },
  contentText: {
    color: "white",
  },

  buttonText: {
    color: "black",
    backgroundColor: "#4EC8F4",
    "&:hover": {
      backgroundColor: "#0097c1",
    },
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
          <Button onClick={onNegativeClick} className={classes.buttonText}>
            Cancel
          </Button>
          <Button onClick={onPositiveClick} className={classes.buttonText}>
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
