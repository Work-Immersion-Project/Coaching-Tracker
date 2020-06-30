import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import app from "../firebase/firebase";
import { signIn } from "../actions";

const GoogleAuth = (props) => {
  useEffect(() => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/calendar");
    provider.addScope("email");

    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        props.signIn(user.uid, user.email);
      } else {
        try {
          await app.auth().signInWithRedirect(provider);
          const redirectResult = await app.auth().getRedirectResult();
          const { uid, email } = redirectResult.user;
          props.signIn(uid, email);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }, []);

  return <div>{props.isSignedIn ? <div>Hello</div> : <div>hehe</div>}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signIn,
})(GoogleAuth);
