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
    confirmCoachingSchedule,
    acceptCoachingSchedule,
    children,
    appointmentData,
    onUpdateStatusButtonPressed,
    accessType,
    loggedInUser,
    classes,
    setTooltipVisibility,
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
              setTooltipVisibility(false);
              onUpdateStatusButtonPressed(
                appointmentData.ID,
                "waiting_for_student_confirmation"
              );
            }}
            variant="contained"
          >
            Finish Session
          </Button>
        );
      } else if (loggedInUser.type === "student") {
        // Get the all the confirmed Students
        const confirmedStudents = appointmentData.confirmedStudents;
        let disabled = true;

        if (_.isEmpty(confirmedStudents)) {
          disabled = false;
        } else if (
          confirmedStudents.filter(
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
              setTooltipVisibility(false);
              confirmCoachingSchedule(appointmentData.ID);
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
        appointmentData.status === "waiting" &&
        loggedInUser.type === "student"
      ) {
        return null;
      } else if (
        appointmentData.status === "waiting" &&
        loggedInUser.type === "teacher"
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
                setTooltipVisibility(false);
                acceptCoachingSchedule(appointmentData);
              }}
              variant="contained"
            >
              Accept Request
            </Button>
            <Button
              className={classes.denyMeetingButton}
              onClick={() => {
                setTooltipVisibility(false);
                onUpdateStatusButtonPressed(appointmentData.ID, "denied");
              }}
              variant="contained"
            >
              Deny Request
            </Button>
          </Grid>
        );
      }

      if (
        appointmentData.status === "waiting_for_student_confirmation" &&
        loggedInUser.type === "student"
      ) {
        return (
          <Grid
            className={classes.meetingButtonWrapper}
            container
            direction="column"
            justify="center"
          >
            {renderConfirmationButton()}
          </Grid>
        );
      } else if (
        appointmentData.status === "waiting_for_student_confirmation" &&
        loggedInUser.type === "teacher"
      ) {
        return (
          <Grid
            className={classes.meetingButtonWrapper}
            container
            direction="column"
            justify="center"
          >
            <Typography align="center" variant="p">
              Students Confirmed: {appointmentData.confirmedStudents.length} /{" "}
              {appointmentData.studentAttendees.length}
            </Typography>
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
                setTooltipVisibility(false);
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
            {loggedInUser.type === "teacher"
              ? renderConfirmationButton()
              : null}
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
                setTooltipVisibility(false);
                onUpdateStatusButtonPressed(appointmentData.ID, "ongoing");
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
                setTooltipVisibility(false);
                onUpdateStatusButtonPressed(appointmentData.ID, "cancelled");
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
