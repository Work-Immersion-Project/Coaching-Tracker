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

  useEffect(() => {
    getSubjectFields();
  }, [getSubjectFields]);

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
