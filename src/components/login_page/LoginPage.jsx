import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import {} from "../../actions";
import _ from "lodash";
import history from "../../history";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#222222",
    color: "white",
  },
  circle: {
    color: "#4EC8F4",
  },
});

const LoginPage = (props) => {
  const { errorMessage } = props;
  const classes = useStyles();

  const renderContent = () => {
    if (errorMessage) {
      return (
        <Typography>
          Woops something went wrong while signin in. Please try again.
        </Typography>
      );
    }

    if (props.authData == null && !errorMessage) {
      return (
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
        >
          <CircularProgress className={classes.circle} />
          <Typography align="center">Signing In</Typography>
        </Grid>
      );
    } else if (_.isEmpty(props.authData.user) && props.authData.isSignedIn) {
      return (
        <Typography>
          You are currently not registered. Please ask your administrator on how
          to register.
        </Typography>
      );
    } else if (!props.authData.isSignedIn) {
      return (
        <Typography>
          You are currently Logged out. Please refresh to sign in again.
        </Typography>
      );
    } else {
      return <Typography>Redirecting...</Typography>;
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      justify="center"
      className={classes.root}
    >
      {renderContent()}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const gapiAuth = state.gapi.gapiAuth;
  return {
    authData: state.auth.data,
    gapiAuth,
    errorMessage: state.errors.errorMessage,
  };
};

export default connect(mapStateToProps)(LoginPage);
