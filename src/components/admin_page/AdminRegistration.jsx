import React from "react";
import { Button, Grid, InputLabel, FormHelperText } from "@material-ui/core";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CustomTextField from "../custom/CustomTextField";
import CustomSelectField from "../custom/CustomSelectField";
import { Field, reduxForm } from "redux-form";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    backgroundColor: "red",
    color: "white",
  },
  content: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 1em",
    backgroundColor: "#4B4E6D",
  },
  form: {
    backgroundColor: "#222222",
    borderRadius: "1em",
    maxWidth: "600px",
    padding: "1em",
  },
  textField: {
    borderRadius: "10px",
    width: "100%",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    color: "white",
    paddingLeft: "0.5em",
    "& input:error": {
      borderColor: "red",
      borderWidth: 2,
    },
  },
  selectField: {
    borderRadius: "10px",
    color: "white",
    width: "100%",
    border: "2px solid white",
    paddingLeft: "0.5em",
  },
  selectValue: {
    color: "black",
  },
  inputLabel: {
    width: "100%",
    color: "white",
    marginTop: "1em",
    marginBottom: "1em",
    textAlign: "start",
  },
  submitButton: {
    marginTop: "1em",
    margin: "0 5em",
  },
}));

const validate = (values) => {
  const errors = {};
  const requiredFields = ["firstName", "lastName", "email", "id", "type"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const AdminRegistration = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.content} elevation={3}>
      <Grid
        item
        container
        className={classes.form}
        component="form"
        direction="column"
        justify="center"
        noValidate
        autoComplete="off"
      >
        <Grid item sm>
          <InputLabel className={classes.inputLabel}>First Name</InputLabel>
          <Field
            className={classes.textField}
            name="firstName"
            id="firstName"
            required
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm>
          <InputLabel className={classes.inputLabel}>Middle Name</InputLabel>
          <Field
            className={classes.textField}
            name="middleName"
            id="middleName"
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm>
          <InputLabel className={classes.inputLabel}>Last Name</InputLabel>
          <Field
            className={classes.textField}
            name="lastName"
            id="lastName"
            required
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm>
          <InputLabel className={classes.inputLabel}>Email</InputLabel>
          <Field
            className={classes.textField}
            name="email"
            id="email"
            required
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm>
          <InputLabel className={classes.inputLabel}>ID</InputLabel>
          <Field
            className={classes.textField}
            name="id"
            id="id"
            required
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm>
          <InputLabel className={classes.inputLabel}>Type</InputLabel>
          <Field
            name="type"
            id="type"
            required
            native
            disableUnderline
            component={CustomSelectField}
            className={classes.selectField}
          >
            <option value={""} />
            <option className={classes.selectValue} value={"teacher"}>
              Teacher
            </option>
            <option className={classes.selectValue} value={"student"}>
              Student
            </option>
          </Field>
        </Grid>
        <Button className={classes.submitButton} variant="contained">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default reduxForm({
  form: "AdminRegistration",
  validate,
})(AdminRegistration);
