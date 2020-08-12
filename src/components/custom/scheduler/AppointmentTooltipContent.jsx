import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DuoIcon from "@material-ui/icons/Duo";
import { isDayBehind, isMeetingAvailable } from "../../../utils";
import _ from "lodash";

export const AppointmentTooltipContent = withStyles({
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
})(
  ({
    children,
    appointmentData,
    onUpdateStatusButtonPressed,
    accessType,
    confirmCoachingSchedule,
    loggedInUser,
    classes,
    updateVisibility,
    ...restProps
  }) => {
    const dayBehind = isDayBehind(new Date(appointmentData.endDate));
    const meetingAvailable = isMeetingAvailable(
      new Date(appointmentData.startDate),
      new Date(appointmentData.endDate)
    );

    const renderConfirmationButton = () => {
      if (loggedInUser.type === "teacher") {
        return (
          <Button
            className={classes.acceptMeetingButton}
            onClick={() => {
              updateVisibility(false);
              confirmCoachingSchedule(appointmentData.coachingSessionId);
            }}
            variant="contained"
          >
            Finish Session
          </Button>
        );
      } else if (loggedInUser.type === "student") {
        // Get the all the confirmed Students
        const studentsConfirmed = appointmentData.studentsConfirmed;
        let disabled = true;

        if (_.isEmpty(studentsConfirmed)) {
          disabled = false;
        } else if (
          studentsConfirmed.filter(
            (student) => student.email === loggedInUser.email
          ).length === 0
        ) {
          disabled = false;
        }

        return (
          <Button
            disabled={disabled}
            className={classes.acceptMeetingButton}
            onClick={() => {
              updateVisibility(false);

              confirmCoachingSchedule(appointmentData.coachingSessionId);
            }}
            variant="contained"
          >
            Finish Session
          </Button>
        );
      }
    };

    const renderUpdateButtons = () => {
      if (
        appointmentData.status === "denied" ||
        appointmentData.status === "overdue" ||
        appointmentData.status === "cancelled" ||
        appointmentData.status === "finished"
      ) {
        return null;
      }

      if (
        appointmentData.status === "waiting_for_response" &&
        accessType === "student"
      ) {
        return null;
      } else if (
        appointmentData.status === "waiting_for_response" &&
        accessType === "teacher"
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
                updateVisibility(false);
                onUpdateStatusButtonPressed(
                  appointmentData.coachingSessionId,
                  "pending"
                );
              }}
              variant="contained"
            >
              Accept Request
            </Button>
            <Button
              className={classes.denyMeetingButton}
              onClick={() => {
                updateVisibility(false);
                onUpdateStatusButtonPressed(
                  appointmentData.coachingSessionId,
                  "denied"
                );
              }}
              variant="contained"
            >
              Deny Request
            </Button>
          </Grid>
        );
      }

      if (appointmentData.status === "ongoing") {
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
                updateVisibility(false);
                window.open(appointmentData.meetingLink, "_blank");
              }}
              variant="contained"
              startIcon={<DuoIcon />}
            >
              Join Google Meet
            </Button>
            <Typography align="center" variant="subtitle2">
              {appointmentData.meetingLink}
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
              if (loggedInUser.type !== "student") {
                updateVisibility(false);
                onUpdateStatusButtonPressed(
                  appointmentData.coachingSessionId,
                  "ongoing"
                );
              }
              window.open(appointmentData.meetingLink, "_blank");
            }}
            variant="contained"
            startIcon={<DuoIcon />}
          >
            Join Google Meet
          </Button>
          <Typography align="center" variant="subtitle2">
            {!meetingAvailable || dayBehind ? "" : appointmentData.meetingLink}
          </Typography>

          {loggedInUser.type !== "student" ? (
            <Button
              className={classes.denyMeetingButton}
              onClick={() => {
                updateVisibility(false);
                onUpdateStatusButtonPressed(
                  appointmentData.coachingSessionId,
                  "cancelled"
                );
              }}
              variant="contained"
            >
              Cancel
            </Button>
          ) : null}
        </Grid>
      );
    };

    return (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid
          className={classes.container}
          container
          justify="center"
          alignItems="center"
        >
          {renderUpdateButtons()}
        </Grid>
      </AppointmentTooltip.Content>
    );
  }
);
