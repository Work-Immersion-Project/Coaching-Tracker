import React, { useEffect } from "react";
import { reduxForm, Field, FieldArray, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getSubjectFields } from "../../actions";
import CustomAutoComplete from "../custom/CustomAutocomplete";
import _ from "lodash";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  InputLabel,
  Grid,
  Chip,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "1em",
  },
  chipsWrapper: {
    margin: "1em 0.25em",
  },
}));

const subjectsFieldSelector = formValueSelector("AssignSubjectsFormDialog");

const AssignSubjectsFormDialog = (props) => {
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
  const classes = useStyles();

  useEffect(() => {
    getSubjectFields();
  }, []);


  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle>{title}</DialogTitle>
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
