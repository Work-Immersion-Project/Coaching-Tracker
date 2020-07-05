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
    border: "2px solid white",
    color: "white",
    paddingLeft: "0.5em",
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

const AdminRegistration = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.content} component={Paper} elevation={3}>
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
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm>
          <InputLabel className={classes.inputLabel}>Email</InputLabel>
          <Field
            className={classes.textField}
            name="email"
            id="email"
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm>
          <InputLabel className={classes.inputLabel}>ID</InputLabel>
          <Field
            className={classes.textField}
            name="id"
            id="id"
            component={CustomTextField}
          />
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
})(AdminRegistration);
