import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InterweaveBG from "../custom/svgs/interweave.svg";
import {
  Paper,
  Grow,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import CookieConsent from "react-cookie-consent";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    backgroundColor: "#222222",
  },
  content: {
    height: "100%",
    width: "100%",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  card: {
    display: "grid",
    // placeContent: "center",
    placeItems: "center",
    maxHeight: "500px",
    height: "50%",
    width: "40%",
  },
  logo: {
    backgroundColor: "black",
    width: `30%`,
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",

    backgroundImage: `url(${InterweaveBG})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  indicatorWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  consentContainer: {
    backgroundColor: "#222222",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
  },
  consentButton: {
    backgroundColor: "#4EC8F4 ",
    borderRadius: "10px ",
  },
}));
const LandingPage = ({
  errorMessage,
  currErrorMessage,
  setErrorMessage,
  authData,
}) => {
  const classes = useStyles();
  useEffect(() => {
    const location = history.location;
    const { from } = location.state || {
      from: { pathName: "/Coaching-Tracker" },
    };

    if (authData) {
      const { isSignedIn, user } = authData;
      if (isSignedIn) {
        if (user) {
          if (from.pathName === "/Coaching-Tracker") {
            history.replace(`${from.pathName}/${user.type}`);
          } else {
            history.replace(from);
          }
        }
      }
    }
  }, [authData]);
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  }, [currErrorMessage, setErrorMessage, errorMessage]);

  const renderContent = () => {
    if (currErrorMessage) {
      return (
        <Typography>
          Woops something went wrong while signin in. Please try again.
        </Typography>
      );
    }

    return (
      <>
        <CircularProgress />
        <br />
        <Typography variant="body1">{`Signing In`}</Typography>
      </>
    );
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.background}>
          <Grow in={true} {...{ timeout: 1000 }}>
            <div className={classes.content}>
              <Paper className={classes.card}>
                <div className={classes.header}>
                  <img
                    className={classes.logo}
                    src={`${process.env.PUBLIC_URL}/ciit_logo.png`}
                  />
                  <Typography variant="h6">Coaching Tracker</Typography>
                </div>
                <div className={classes.indicatorWrapper}>
                  {renderContent()}
                </div>
              </Paper>
            </div>
          </Grow>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
