import React from "react";
import { reduxForm, Field } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";
import CustomMaterialTextField from "../custom/CustomMaterialTextField";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  createMuiTheme, 
  ThemeProvider,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    color: "white",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        color: "white",
        backgroundColor: "#222222",
      }
    },
    MuiInputLabel: {
      root: {
        color: "white",
        "&$focused": {
          color: "#4EC8F4",
        },
      },
    },
    MuiInput: {
      root: {
        color: "white",
      },
      underline: {
        minWidth: "270px",
        "&:before": {
          borderBottom: "1px solid rgba(78,200,244, 1)",
        },
        "&:after": {
          borderBottom: `2px solid rgba(78,200,244, 1)`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid rgba(78,200,244, 1)`,
        },
      },
    },
    MuiButton: {
      root: {
        backgroundColor: "#4EC8F4",
        "&:hover": {
          backgroundColor: "#0097c1",
          "@media (hover: none)": {
            backgroundColor: "#4EC8F4",
          },
        },
      },
      text: {
        color: "#000000",
      },
    },
  }
});

const AddSubjectFormDialog = ({
  open,
  onDialogClose,
  title,
  onNegativeClick,
  onPositiveClick,
  handleSubmit,
  pristined,
}) => {
  const classes = useStyles();
  
  return (
    <ThemeProvider theme={formTheme}>
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle className = {classes.title}>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onPositiveClick)}>
        <DialogContent className = {classes.inputBox}>
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
    </ThemeProvider>
  );
};

export default reduxForm({
  form: "AddSubjectFormDialog",
})(AddSubjectFormDialog);
