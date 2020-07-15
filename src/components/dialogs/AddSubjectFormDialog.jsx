import React from "react";
import { reduxForm, Field } from "redux-form";
import CustomMaterialTextField from "../custom/CustomMaterialTextField";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";

const AddSubjectFormDialog = ({
  open,
  onDialogClose,
  title,
  onNegativeClick,
  onPositiveClick,
  handleSubmit,
  pristined,
}) => {
  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onPositiveClick)}>
        <DialogContent>
          <Field
            name="subjectName"
            label="Subject Name"
            component={CustomMaterialTextField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onNegativeClick}>Cancel</Button>
          <Button disabled={pristined} type="submit">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default reduxForm({
  form: "AddSubjectFormDialog",
})(AddSubjectFormDialog);
