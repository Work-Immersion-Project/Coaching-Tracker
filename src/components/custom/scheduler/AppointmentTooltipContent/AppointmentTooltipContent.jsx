import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DuoIcon from "@material-ui/icons/Duo";
import { isDayBehind, isMeetingAvailable } from "../../../../utils";

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
    confirmCoachingSession,
    acceptCoachingSession,
    updateCoachingSession,
    hideModal,
    showModal,
    children,
    appointmentData,
    currentUser,
    classes,
    toggleTooltipVisibility,
    ...restProps
  }) => {
    const dayBehind = isDayBehind(new Date(appointmentData.endDate));
    const meetingAvailable = isMeetingAvailable(
      new Date(appointmentData.startDate),
      new Date(appointmentData.endDate)
    );

    const renderConfirmationButton = () => {
      if (currentUser.type === "teacher") {
        return (
          <Button
            className={classes.acceptMeetingButton}
            onClick={() => {
              toggleTooltipVisibility(false);

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
      }

      // Get the all the confirmed Students
      const confirmedStudents = appointmentData.confirmedStudents;
      let disabled = true;

      if (
        confirmedStudents.filter(
          (student) => student.email === currentUser.email
        ).length === 0
      ) {
        disabled = false;
      }

      return (
        <Button
          disabled={disabled}
          className={classes.acceptMeetingButton}
          onClick={() => {
            toggleTooltipVisibility(false);
            confirmCoachingSession(appointmentData.ID);
          }}
          variant="contained"
        >
          Confirm Session
        </Button>
      );
    };

    const renderUpdateButtons = () => {
      if (
        ["denied", "overdue", "cancelled", "finished"].includes(
          appointmentData.status
        )
      ) {
        return null;
      }

      if (
        appointmentData.status === "waiting" &&
        currentUser.type === "student"
      ) {
        return null;
      }
      if (
        appointmentData.status === "waiting" &&
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
                toggleTooltipVisibility(false);
                acceptCoachingSession(appointmentData);
              }}
              variant="contained"
            >
              Accept Request
            </Button>
            <Button
              className={classes.denyMeetingButton}
              onClick={() => {
                toggleTooltipVisibility(false);
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
        currentUser.type === "student"
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
      }
      if (
        appointmentData.status === "waiting_for_student_confirmation" &&
        currentUser.type === "teacher"
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
                toggleTooltipVisibility(false);
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
            {currentUser.type === "teacher" ? renderConfirmationButton() : null}
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
                toggleTooltipVisibility(false);
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

          {currentUser.type !== "student" ? (
            <Button
              className={classes.denyMeetingButton}
              onClick={() => {
                toggleTooltipVisibility(false);
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

    const onDialogClose = () => {
      hideModal();
    };

    const onUpdateStatusButtonPressed = (id, status) => {
      let title = "";
      let content = "";

      switch (status) {
        case "ongoing":
          updateCoachingSession({ id, status });
          break;
        case "pending":
          title = "Accept Coaching Session Request?";
          content = "Are you sure that you are available at this date?";
          break;
        case "cancelled":
          title = "Cancel Session?";
          content = "Are you sure that you want to cancel this session?";
          break;
        case "denied":
          title = "Deny Coaching Session Request?";
          content = "Are you sure that you want to deny this session?";
          break;
        case "waiting_for_student_confirmation":
          updateCoachingSession({ id, status });
          break;
        default:
          break;
      }

      if (title !== "" && content !== "") {
        showModal("CONFIRMATION_MODAL", {
          onDialogClose: onDialogClose,
          title,
          content,
          onNegativeClick: onDialogClose,
          onPositiveClick: () =>
            updateCoachingSession({
              id,
              status,
            }),
        });
      }
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
