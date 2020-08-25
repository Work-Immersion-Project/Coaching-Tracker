import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  createMuiTheme,
  ThemeProvider,
  DialogContent,
  Button,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import DuoIcon from "@material-ui/icons/Duo";
import Lens from "@material-ui/icons/Lens";
import AccessTime from "@material-ui/icons/AccessTime";
import { isDayBehind, isMeetingAvailable } from "../../../utils";
import moment from "moment";
import classNames from "clsx";

import _ from "lodash";

const statusColors = {
  pending: "#8C7E10",
  finished: "#2e7d32",
  denied: "#7A1313",
  ongoing: "blue",
  waiting_for_response: "#BDA911",
  overdue: "#C87142",
};

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  content: {
    minWidth: "250px",
    minHeight: "190px",
    padding: spacing(1.5),
    paddingTop: spacing(1),
    background: "white",
    boxSizing: "border-box",
    ...typography.body2,
  },
  text: {
    display: "inline-block",
    color: "black",
  },
  title: {
    ...typography.h6,
    fontWeight: typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "black",
  },
  icon: {
    verticalAlign: "middle",
    color: "#4EC8F4",
  },
  lens: {
    color: (coachingSession) => statusColors[coachingSession.status],
    width: spacing(4.5),
    height: spacing(4.5),
    verticalAlign: "super",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%,0)",
  },
  lensMini: {
    width: spacing(2.5),
    height: spacing(2.5),
  },
  textCenter: {
    textAlign: "center",
    height: spacing(2.5),
  },
  dateAndTitle: {
    lineHeight: 1.4,
  },
  titleContainer: {
    paddingBottom: spacing(2),
    marginRight: spacing(10),
  },
  contentContainer: {
    paddingBottom: spacing(1.5),
    marginRight: spacing(10),
  },
  resourceContainer: {
    paddingBottom: spacing(1),
    marginRight: spacing(10),
  },

  relativeContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
  },
  meetingButtonWrapper: {
    margin: "1em 0",
  },
  meetingButton: {
    margin: "1em",
    backgroundColor: "#109083",
    "&:hover": {
      backgroundColor: "#006256",
    },
    color: "white",
  },
  meetingLink: {
    fontSize: "0.8rem",
  },
  acceptMeetingButton: {
    margin: "1em",
    backgroundColor: "#0000ff",
    "&:hover": {
      backgroundColor: "#0000ca",
    },
    color: "white",
  },
  denyMeetingButton: {
    margin: "1em",
    backgroundColor: "#ff0000",
    "&:hover": {
      backgroundColor: "#c20000",
    },
    color: "white",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiDialogContent: {
      root: {
        backgroundColor: "#222222",
      },
    },
  },
});

const CoachingSessionDialog = ({
  open,
  onDialogClose,
  updateCoachingScheduleStatus,
  showModal,
  coachingSession,
  selectedCoachingSessionID,
  getCoachingSession,
  currentUser,
}) => {
  const classes = useStyles(coachingSession);

  useEffect(() => {
    getCoachingSession(selectedCoachingSessionID);
  }, [selectedCoachingSessionID, getCoachingSession]);

  const onUpdateStatusButtonPressed = (status) => {
    let title = "";
    let content = "";
    if (status === "pending") {
      title = "Accept Schedule Request?";
      content = "Are you sure that you are available at this date?";
    } else if (status === "cancelled") {
      title = "Cancel Schedule?";
      content = "Are you sure that you want to cancel this session?";
    } else if (status === "denied") {
      title = "Deny Schedule Request?";
      content = "Are you sure that you want to deny this session?";
    }

    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title,
      content,
      onNegativeClick: onDialogClose,
      onPositiveClick: () =>
        updateCoachingScheduleStatus(selectedCoachingSessionID, status),
    });
  };

  const renderConfirmationButton = () => {
    if (currentUser.type === "teacher") {
      return (
        <Button
          className={classes.acceptMeetingButton}
          onClick={() => {
            // confirmCoachingSchedule(selectedCoachingSessionID);
          }}
          variant="contained"
        >
          Finish Session
        </Button>
      );
    } else if (currentUser.type === "student") {
      let disabled = true;

      if (coachingSession.studentsConfirmed) {
        disabled =
          !coachingSession.studentsConfirmed.filter(
            (student) => student.email === currentUser.email
          ).length === 0;
      }

      return (
        <Button
          disabled={disabled}
          className={classes.acceptMeetingButton}
          onClick={() => {
            // confirmCoachingSchedule(selectedCoachingSessionID);
          }}
          variant="contained"
        >
          Finish Session
        </Button>
      );
    }
  };

  const renderButtons = () => {
    if (
      coachingSession.status === "denied" ||
      coachingSession.status === "overdue" ||
      coachingSession.status === "cancelled" ||
      coachingSession.status === "finished"
    ) {
      return null;
    }
    if (
      coachingSession.status === "waiting_for_response" &&
      currentUser.type === "student"
    ) {
      return null;
    }
    if (
      coachingSession.status === "waiting_for_response" &&
      currentUser.type === "teacher"
    ) {
      return (
        <Grid
          className={classes.meetingButtonWrapper}
          container
          direction="column"
          justify="center"
        >
          <Button
            className={classes.acceptMeetingButton}
            onClick={() => {
              onUpdateStatusButtonPressed("pending");
            }}
            variant="contained"
          >
            Accept Request
          </Button>
          <Button
            className={classes.denyMeetingButton}
            onClick={() => {
              onUpdateStatusButtonPressed("denied");
            }}
            variant="contained"
          >
            Deny Request
          </Button>
        </Grid>
      );
    }

    const dayBehind = isDayBehind(new Date(coachingSession.endDate));

    const meetingAvailable = isMeetingAvailable(
      new Date(coachingSession.startDate),
      new Date(coachingSession.endDate)
    );

    if (coachingSession.status === "ongoing") {
      return (
        <Grid
          className={classes.meetingButtonWrapper}
          container
          direction="column"
          justify="center"
        >
          <Button
            disabled={!meetingAvailable || dayBehind}
            className={classes.meetingButton}
            onClick={() => {
              window.open(coachingSession.meetingLink, "_blank");
            }}
            variant="contained"
            startIcon={<DuoIcon />}
          >
            Join Google Meet
          </Button>
          <Typography align="center" variant="subtitle2">
            {coachingSession.meetingLink}
          </Typography>
          {renderConfirmationButton()}
        </Grid>
      );
    }

    return (
      <Grid
        className={classes.meetingButtonWrapper}
        container
        direction="column"
        justify="center"
      >
        <Button
          disabled={!meetingAvailable || dayBehind}
          className={classes.meetingButton}
          onClick={() => {
            if (currentUser.type !== "student") {
              updateCoachingScheduleStatus(
                selectedCoachingSessionID,
                "ongoing"
              );
            }
            window.open(coachingSession.meetingLink, "_blank");
          }}
          variant="contained"
          startIcon={<DuoIcon />}
        >
          Join Google Meet
        </Button>
        <Typography align="center" variant="subtitle2">
          {!meetingAvailable || dayBehind ? "" : coachingSession.meetingLink}
        </Typography>

        {currentUser.type !== "student" ? (
          <Button
            className={classes.denyMeetingButton}
            onClick={() => {
              onUpdateStatusButtonPressed("cancelled");
            }}
            variant="contained"
          >
            Cancel
          </Button>
        ) : null}
      </Grid>
    );
  };

  const renderContent = () => {
    if (
      _.isEmpty(coachingSession) ||
      coachingSession.ID !== selectedCoachingSessionID
    ) {
      return <CircularProgress />;
    }
    const titleDate = moment(coachingSession.startDate).format(
      "dddd, MMMM D, YYYY"
    );
    const titleStartHours = moment(coachingSession.startDate).format("h:mm A");
    const titleEndHours = moment(coachingSession.endDate).format("h:mm A");

    return (
      <div className={classes.content}>
        <Grid
          container
          alignItems="flex-start"
          className={classes.titleContainer}
        >
          <Grid item xs={3}>
            <div className={classes.relativeContainer}>
              <Lens className={classes.lens} />
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {coachingSession.title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              {titleDate}
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          className={classes.contentContainer}
        >
          <Grid item xs={3} className={classes.textCenter}>
            <AccessTime className={classes.icon} />
          </Grid>
          <Grid item xs={9}>
            <div className={classes.text}>
              {`${titleStartHours}
              - ${titleEndHours}`}
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          className={classes.resourceContainer}
        >
          <Grid item xs={3} className={classes.textCenter}>
            <div className={classes.relativeContainer}>
              <Lens className={classNames(classes.lens, classes.lensMini)} />
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className={classes.text}>{coachingSession.status}</div>
          </Grid>
        </Grid>
        {coachingSession.studentAttendees.map((student) => (
          <Grid
            container
            alignItems="center"
            className={classes.resourceContainer}
            key={`${student.email}`}
          >
            <Grid item xs={3} className={classes.textCenter}>
              <div className={classes.relativeContainer}>
                <Lens
                  className={classNames(classes.lens, classes.lensMini)}
                  style={{ color: "red" }}
                />
              </div>
            </Grid>
            <Grid item xs={9}>
              <div className={classes.text}>{student.metadata.fullName}</div>
            </Grid>
          </Grid>
        ))}
        {renderButtons()}
      </div>
    );
  };
  return (
    <ThemeProvider theme={formTheme}>
      <Dialog open={open} onClose={onDialogClose}>
        <DialogContent>{renderContent()}</DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default CoachingSessionDialog;
