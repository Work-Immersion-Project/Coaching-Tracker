import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";

export const ConfirmationDialog = ({
  open,
  title,
  content,
  onDialogClose,
  onPositiveClick,
  onNegativeClick,
}) => {
  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNegativeClick}>Cancel</Button>
        <Button onClick={onPositiveClick}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
