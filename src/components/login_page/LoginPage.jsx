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
    backgroundColor: "#222222",
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
    <Grid
      container
      direction="column"
      alignContent="center"
      justify="center"
      className={classes.root}
    >
      <Grid item>
        <Card className={classes.loginCard}>
          <CardContent>
            <form>
              <Grid direction="column" justify="center" alignItems="center">
                <Grid item>
                  <Typography className={classes.header} align="center">
                    Welcome
                  </Typography>
                </Grid>
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>

                <Grid item>
                  <Button>Submit</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default reduxForm({
  form: "loginForm",
})(LoginPage);
