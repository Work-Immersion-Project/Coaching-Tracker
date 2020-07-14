import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import CustomMaterialTextField from "../../custom/CustomMaterialTextField";
import { showModal, hideModal } from "../../../actions";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    padding: "1em",
  },
  textField: {
    width: "100%",
    margin: "1em 0",
  },
  button: {
    width: "100%",
    color: "white",
    backgroundColor: "#95A3B3",
  },
}));

const AddSubjectForm = (props) => {
  const classes = useStyles();
  const { handleSubmit, reset, pristined } = props;

  const onSubmit = (values) => {};

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        className={classes.container}
        item
        container
        direction="column"
        justify="center"
      >
        <Grid item>
          <Field
            className={classes.textField}
            name="subject-name"
            component={CustomMaterialTextField}
            label="Subject Name"
          />
        </Grid>
        <Grid item>
          <Button className={classes.button} type="submit" variant="outlined">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const AddSubjectFormWithReduxForm = reduxForm({
  form: "AddSubjectForm",
})(AddSubjectForm);

export default connect(mapStateToProps)(AddSubjectFormWithReduxForm);
