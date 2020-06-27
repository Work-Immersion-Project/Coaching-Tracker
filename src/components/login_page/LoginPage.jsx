import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, TextField } from "@material-ui/core";
import { Field } from "redux-form";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#4B4E6D",
  },
  loginCard: {
    maxWidth: "500px",
    backgroundColor: "#222222",
  },
  header: {
    color: "white",
  },
});

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const LoginPage = () => {
  //TODO: Implement login form.
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.loginCard}>
        <CardContent>
          <Typography className={classes.header} align="center">
            Login
          </Typography>
          <form>
            {/* <div>
              <Field name="email" label="Email" component={renderTextField} />
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
