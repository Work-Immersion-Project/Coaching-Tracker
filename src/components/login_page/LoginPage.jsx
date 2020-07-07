import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { signIn } from "../../actions";
import _ from "lodash";
import app from "../../firebase";
import history from "../../history";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#4B4E6D",
    color: "white",
  },
});

const LoginPage = (props) => {
  const classes = useStyles();

  useEffect(() => {
    const location = history.location;
    const { from } = location.state || { from: { pathName: "/" } };

    const currentUser = app.auth().currentUser;

    if (!currentUser) {
      props.signIn(props.gapiAuth);
    }

    if (props.authData) {
      const { isSignedIn, user } = props.authData;
      if (isSignedIn) {
        if (!_.isEmpty(user) && user) {
          if (from.pathName === "/") {
            history.replace(`${from.pathName}${user.type}`);
          } else {
            history.replace(from);
          }
        }
      }
    }
  }, [props]);

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
          <CircularProgress />
          <Typography align="center">Signing In</Typography>
        </Grid>
      );
    } else if (_.isEmpty(props.authData.user)) {
      return (
        <Typography>
          You are currently not registered. Please ask your administrator on how
          to register.
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
  };
};

export default connect(mapStateToProps, {
  signIn,
})(LoginPage);
