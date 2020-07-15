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
    subjectFieldsValues,
    getSubjectFields,
    currentSubjects,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    getSubjectFields();
  }, []);

  const renderSubjectChips = (fields) => {
    const values = fields.getAll();
    if (values) {
      return values.map(({ subjectName }, index) => {
        return (
          <Chip
            className={classes.chipsWrapper}
            key={subjectName}
            label={subjectName}
            onDelete={() => fields.remove(index)}
          />
        );
      });
    }
    return null;
  };

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
                renderValues={renderSubjectChips}
                getOptionLabel={(option) => option.subjectName}
                component={CustomAutoComplete}
                inputComponent={TextField}
                options={
                  subjectFieldsValues
                    ? subjectFields.filter(
                        (option) =>
                          subjectFieldsValues.filter(
                            (subjectField) =>
                              subjectField.subjectName === option.subjectName
                          ).length === 0
                      )
                    : subjectFields
                    ? subjectFields.filter(
                        (option) =>
                          currentSubjects.filter(
                            (subject) => subject === option.subjectName
                          ).length === 0
                      )
                    : subjectFields
                }
                variant="outlined"
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
