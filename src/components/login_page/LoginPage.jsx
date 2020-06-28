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
} from "@material-ui/core";

import { Email, Lock } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#4B4E6D",
    color: "#FFFFFF",
  },
  loginCard: {
    maxWidth: "500px",
    backgroundColor: "#222222",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    color: "#FFFFFF",
  },
  header: {
    color: "white",
    fontSize: "2rem",
  },
});

const CustomTextField = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const renderTextField = ({
  label,
  input,
  variant,
  id,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <CustomTextField
    id={id}
    error={touched && invalid}
    helperText={touched && error}
    variant={variant}
    {...input}
    {...custom}
  />
);

const LoginPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignContent="center"
        justify="center"
      >
        <Grid item>
          <Card className={classes.loginCard}>
            <CardContent>
              <Typography className={classes.header} align="center">
                Welcome
              </Typography>
              <form className={classes.loginForm}>
                <FormControl>
                  <InputLabel shrink htmlFor="email-input">
                    Email
                  </InputLabel>
                  <Field
                    id="email-input"
                    name="email"
                    component={renderTextField}
                    variant="outlined"
                    label="Email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel shrink htmlFor="password-input">
                    Password
                  </InputLabel>
                  <Field
                    id="password-input"
                    name="password"
                    component={renderTextField}
                    variant="outlined"
                    label="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default reduxForm({
  form: "loginForm",
})(LoginPage);
