import React from "react";
import { Typography, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CoachingSessionCard } from "../../custom/CoachingSessionCard";
import { CoachingSessionListItem } from "../../custom/CoachingSessionListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplate: "1fr 1fr / 1fr",
    gridGap: "50px",
    padding: "2em",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  onGoingSessionsWrapper: {
    padding: "1em 1em 2em 1em",
    backgroundColor: "white",
    borderRadius: "30px",
    overflow: "hidden",
  },

  onGoingSessions: {
    display: "flex",
    flexWrap: "nowrap",

    alignItems: "center",
    borderRadius: "30px",
    height: "100%",
    overflowY: "auto",

    backgroundColor: "white",

    WebkitOverflowScrolling: "touch",
    // Scrollbar Related
    "&::-webkit-scrollbar": {
      height: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#222222",
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#4EC8F4",
      borderRadius: "20px",
    },
  },
  sessionsWrapper: {
    padding: "1em 1em 2em 1em",
    backgroundColor: "white",
    borderRadius: "30px",
    overflow: "hidden",
  },
  sessions: {
    borderRadius: "30px",
    height: "100%",
    overflowX: "auto",
    marginBottom: "2em",

    paddingRight: "1.5em",

    backgroundColor: "white",
    WebkitOverflowScrolling: "touch",
    // Scrollbar Related
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&::-webkit-scrollbar-track": {
      background: "#222222",
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#4EC8F4",
      borderRadius: "20px",
    },
  },
}));

const TeacherDashboard = ({ onGoingCoachingSessions, coachingSessions }) => {
  const classes = useStyles();

  const renderOnGoingSessions = () => {
    if (onGoingCoachingSessions) {
      if (onGoingCoachingSessions.length === 0) {
        return (
          <div
            style={{
              height: "100%",
              width: "100%",

              display: "grid",
              placeContent: "center",
            }}
          >
            <Typography variant="h5">No Ongoing Sessions</Typography>
          </div>
        );
      }

      return onGoingCoachingSessions.map((coachingSession) => (
        <CoachingSessionCard
          key={coachingSession.ID}
          coachingSessionDetails={coachingSession}
        />
      ));
    }
    return (
      <div
        style={{
          height: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  };

  const renderCoachingSessions = () => {
    if (coachingSessions) {
      if (coachingSessions.length === 0) {
        return (
          <div
            style={{
              height: "100%",
              display: "grid",
              placeContent: "center",
            }}
          >
            <Typography variant="h5">No Sessions</Typography>
          </div>
        );
      }

      return coachingSessions.map((coachingSession) => (
        <CoachingSessionListItem
          key={coachingSession.ID}
          coachingSessionDetails={coachingSession}
        />
      ));
    }
    return (
      <div
        style={{
          height: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.onGoingSessionsWrapper}>
        <Typography variant="h5">Ongoing Sessions</Typography>
        <div className={classes.onGoingSessions}>{renderOnGoingSessions()}</div>
      </Paper>
      <Paper className={classes.sessionsWrapper}>
        <Typography variant="h5">Sessions</Typography>
        <div className={classes.sessions}>{renderCoachingSessions()}</div>
      </Paper>
    </div>
  );
};

export default TeacherDashboard;
