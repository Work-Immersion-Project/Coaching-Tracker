import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { getUser, signIn, signOut } from "../../actions";
import _ from "lodash";
import firebase from "firebase";
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
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();

  const onAuthChange = useCallback(
    () => async (isSignedIn) => {
      const { gapiAuth } = props;
      if (!isSignedIn) {
        try {
          await gapiAuth.signIn({
            prompt: "select_account",
          });
          const currentUser = gapiAuth.currentUser.get();
          const { access_token, id_token } = currentUser.getAuthResponse();
          const credential = firebase.auth.GoogleAuthProvider.credential(
            id_token
          );
          app.auth().onAuthStateChanged(async (user) => {
            if (user) {
              props.getUser(user.email, user.uid, access_token);
            } else {
              await app.auth().signInWithCredential(credential);
            }
          });
        } catch (error) {
          setErrorMessage(error);
        }
      }
    },
    [props]
  );

  useEffect(() => {
    const location = history.location;
    const { from } = location.state || { from: { pathName: "/" } };

    onAuthChange(props.gapiAuth.isSignedIn.get());
    props.gapiAuth.isSignedIn.listen(onAuthChange);

    if (props.isSignedIn && !_.isEmpty(props.currentUser)) {
      if (from.pathName === "/") {
        history.replace(`${from.pathName}${props.currentUser.type}`);
      } else {
        history.replace(from);
      }
    }
  }, [props, onAuthChange]);

  const renderContent = () => {
    if (errorMessage) {
      return (
        <Typography>
          Woops something went wrong while signin in. Please try again.
        </Typography>
      );
    }

    if (props.currentUser == null && !errorMessage) {
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
    } else if (_.isEmpty(props.currentUser)) {
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

const mapStateToProps = (state, ownProps) => {
  const isSignedIn = state.auth.isSignedIn;
  const currentUser = state.users.currentUser;
  const gapiAuth = state.gapi.gapiAuth;

  return {
    isSignedIn,
    currentUser,
    gapiAuth,
  };
};

export default connect(mapStateToProps, {
  getUser,
  signIn,
  signOut,
})(LoginPage);
