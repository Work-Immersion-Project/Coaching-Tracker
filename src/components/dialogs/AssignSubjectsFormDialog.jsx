import React, { useEffect } from "react";
import { reduxForm, FieldArray, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getSubjectFields } from "../../actions";
import CustomAutoComplete from "../custom/CustomAutocomplete";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  InputLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "1em",
  },
  chipsWrapper: {
    margin: "1em 0.25em",
  },
  title: {
    color: "black !important",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        color: "white",
        backgroundColor: "#222222",
      },
    },

    MuiInputLabel: {
      root: {
        color: "#84DCC6",
      },
    },

    MuiInput: {
      root: {
        color: "white",
      },
      underline: {
        minWidth: "270px",
        "&:before": {
          borderBottom: "1px solid rgba(132, 220, 198, 1)",
        },
        "&:after": {
          borderBottom: `2px solid rgba(132, 220, 198, 1)`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid rgba(132, 220, 198, 1)`,
        },
      },
    },
    MuiButton: {
      root: {
        backgroundColor: "#84DCC6",
        "&:hover": {
          backgroundColor: "#52aa95",
          "@media (hover: none)": {
            backgroundColor: "#84DCC6",
          },
        },
      },
    },
  },
});

const subjectsFieldSelector = formValueSelector("AssignSubjectsFormDialog");

const AssignSubjectsFormDialog = (props) => {
  const classes = useStyles();
  console.log(props);
  const {
    open,
    onDialogClose,
    title,
    onNegativeClick,
    onPositiveClick,
    handleSubmit,
    pristined,
    subjectFields,
    getSubjectFields,
    currentSubjects,
  } = props;

  useEffect(() => {
    getSubjectFields();
  }, [getSubjectFields]);

  return (
    <ThemeProvider theme={formTheme}>
      <Dialog open={open} onClose={onDialogClose}>
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <form onSubmit={handleSubmit(onPositiveClick)}>
          <DialogContent>
            <Grid container direction="column" justify="center" spacing={1}>
              <Grid item>
                <InputLabel>Subjects</InputLabel>
                <FieldArray
                  name="subjects"
                  multiple={true}
                  getOptionLabel={(option) => option.subjectName}
                  component={CustomAutoComplete}
                  inputComponent={TextField}
                  options={
                    subjectFields
                      ? subjectFields.filter(
                          (field) =>
                            currentSubjects.filter(
                              (currSubj) => currSubj === field.subjectName
                            ).length === 0
                        )
                      : []
                  }
                />
              </Grid>
            </Grid>
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

const mapStateToProps = (state) => {
  return {
    subjectFields: state.fields.data?.subjectFields,
    subjectFieldsValues: subjectsFieldSelector(state, "subjects"),
  };
};

const AssignSubjectsFormDialogWithReduxForm = reduxForm({
  form: "AssignSubjectsFormDialog",
})(AssignSubjectsFormDialog);

export default connect(mapStateToProps, {
  getSubjectFields,
})(AssignSubjectsFormDialogWithReduxForm);
