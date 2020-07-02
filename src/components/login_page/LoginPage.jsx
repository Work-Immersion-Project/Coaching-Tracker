import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { getUser } from "../../actions";
import _ from "lodash";
import firebase from "firebase";
import app from "../../firebase";
import { Redirect, useLocation, useHistory } from "react-router-dom";

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
  const _auth = useRef();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathName: "/" } };

  const onAuthChange = async (isSignedIn) => {
    if (!isSignedIn) {
      try {
        await _auth.current.signIn({
          prompt: "select_account",
        });
      } catch (error) {
        setErrorMessage(error);
      }
    } else {
      const currentUser = _auth.current.currentUser.get();
      const { access_token, id_token } = currentUser.getAuthResponse();
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      app.auth().onAuthStateChanged(async (user) => {
        if (user) {
          props.getUser(user.email, user.uid, access_token);
        } else {
          await app.auth().signInWithCredential(credential);
        }
      });
    }
  };

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "347125005886-kt2hubgo6bljk7m9q0kj0t6vg8bk6g0b.apps.googleusercontent.com",
          scope: "email https://www.googleapis.com/auth/calendar",
          ux_mode: "popup",
        })
        .then(() => {
          _auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(_auth.current.isSignedIn.get());
          _auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

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
      // Handle Routing
      if (props.currentUser.type === "admin") {
        history.replace(from);
      } else if (props.currentUser.type === "student") {
        history.replace(from);
      } else if (props.currentUser.type === "teacher") {
        history.replace(from);
      }
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
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps, {
  getUser,
})(LoginPage);
