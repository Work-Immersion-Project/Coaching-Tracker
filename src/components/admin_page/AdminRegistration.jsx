import React from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Chip,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Card,
} from "@material-ui/core";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import CustomTextField from "../custom/CustomTextField";
import { Field, reduxForm } from "redux-form";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    backgroundColor: "red",
    color: "white",
  },
  content: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B4E6D",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222222",
    padding: "1em 2em",
  },
  textField: {
    borderRadius: "10px",
    border: "2px solid white",
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
  },
}));

const AdminRegistration = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.content}>
      <Card
        component="form"
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <InputLabel className={classes.inputLabel}>First Name</InputLabel>
        <Field
          className={classes.textField}
          name="firstName"
          id="firstName"
          component={CustomTextField}
        />
        <InputLabel className={classes.inputLabel}>Middle Name</InputLabel>
        <Field
          className={classes.textField}
          name="middleName"
          id="middleName"
          component={CustomTextField}
        />
        <InputLabel className={classes.inputLabel}>Last Name</InputLabel>
        <Field
          className={classes.textField}
          name="lastName"
          id="lastName"
          component={CustomTextField}
        />
        <InputLabel className={classes.inputLabel}>Email</InputLabel>
        <Field
          className={classes.textField}
          name="email"
          id="email"
          component={CustomTextField}
        />
        <InputLabel className={classes.inputLabel}>ID</InputLabel>
        <Field
          className={classes.textField}
          name="id"
          id="id"
          component={CustomTextField}
        />
        <Button className={classes.submitButton} variant="contained">
          Submit
        </Button>
      </Card>
    </Paper>
  );
};

export default reduxForm({
  form: "AdminRegistration",
})(AdminRegistration);
