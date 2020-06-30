import React from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import app from "../firebase";
import { Cookies } from "react-cookie";
import { signIn, getUser, addUser } from "../actions";
import { CircularProgress } from "@material-ui/core";
import { auth } from "google-auth-library";
class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "347125005886-kt2hubgo6bljk7m9q0kj0t6vg8bk6g0b.apps.googleusercontent.com",
          scope: "email https://www.googleapis.com/auth/calendar",
          ux_mode: "popup",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = async (isSignedIn) => {
    if (!isSignedIn) {
      await this.auth.signIn({
        prompt: "select_account",
      });
    } else {
      const currentUser = this.auth.currentUser.get();
      const { access_token, id_token } = currentUser.getAuthResponse();
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      app.auth().onAuthStateChanged(async (user) => {
        if (user) {
          this.props.getUser(user.uid, access_token);
          if (this.props.currentUser != null) {
            this.props.addUser(
              user.uid,
              user.email,
              user.displayName,
              "admin",
              access_token
            );
          }
          this.props.signIn();
        } else {
          await app.auth().signInWithCredential(credential);
        }
      });
    }
  };

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps, {
  signIn,
  addUser,
  getUser,
})(GoogleAuth);
