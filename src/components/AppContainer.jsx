import React, { useCallback } from "react";
import App from "./App";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthRequest, gapiInitRequest } from "../actions";

const AppContainer = () => {
  const dispatch = useDispatch();

  const stateToProps = useSelector(({ auth, gapi }) => {
    return {
      authData: auth.data,
      gapiAuthClient: gapi.gapiAuth,
    };
  });

  const dispatchToProps = {
    checkAuthRequest: useCallback(() => dispatch(checkAuthRequest()), [
      dispatch,
    ]),
    gapiInitRequest: useCallback(() => dispatch(gapiInitRequest()), [dispatch]),
  };

  return <App {...stateToProps} {...dispatchToProps} />;
};

export default AppContainer;
