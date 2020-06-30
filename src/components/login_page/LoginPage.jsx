import React from "react";
import { reduxForm, Field } from "redux-form";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  InputLabel,
  InputBase,
  FormControl,
  Container,
  Grid,
  Button,
  OutlinedInput,
} from "@material-ui/core";
import GoogleAuth from "../GoogleAuth";
import { Email, Lock } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#4B4E6D",
  },
  loginCard: {
    backgroundColor: "#222222",
  },
  inputLabel: {
    color: "white",
  },
  inputIcon: {
    color: "white",
  },
  inputForm: {
    marginTop: "1em",
  },
  submitButton: {
    backgroundColor: "#222222",
    borderRadius: "2em",
    width: "100%",
    textAlign: "center",
    color: "white",
    marginTop: "2em",
  },
  header: {
    color: "white",
    fontSize: "2rem",
  },
});

//This helper is used to integrate redux form with material ui's text field.
const renderTextField = ({
  classes,
  label,
  input,
  variant,
  id,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl className={classes.inputForm}>
    <InputLabel shrink className={classes.inputLabel}>
      {label}
    </InputLabel>
    <CustomTextField
      id={id}
      error={touched && invalid}
      helperText={touched && error}
      variant={variant}
      {...input}
      {...custom}
    />
  </FormControl>
);

const CustomTextField = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    border: "2px solid #ffffff",
    fontSize: 16,
    width: "auto",
    padding: "4px 10px",
    marginLeft: 6,
    color: "white",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  inputAdornedStart: {
    paddingRight: 10,
  },
}))(InputBase);

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      justify="center"
      className={classes.root}
    >
      <GoogleAuth />
    </Grid>
  );
};

export default reduxForm({
  form: "loginForm",
})(LoginPage);
