import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getGapiAuthClient } from "../../selectors";
import LandingPage from "./LandingPage";

const LandingPageContainer = () => {
  const [currErrorMessage, setErrorMessage] = useState(null);

  const stateToProps = useSelector((state) => {
    return {
      gapiAuth: getGapiAuthClient(state),
      authData: state.auth.data,
      errorMessage: state.errors.errorMessage,
    };
  });

  return (
    <LandingPage
      {...stateToProps}
      currErrorMessage={currErrorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
};

export default LandingPageContainer;
