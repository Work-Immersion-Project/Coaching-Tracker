import React, { useState } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { connectProps } from "@devexpress/dx-react-core";
import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import DuoIcon from "@material-ui/icons/Duo";
import {
  Scheduler,
  DayView,
  WeekView,
  ViewSwitcher,
  MonthView,
  TodayButton,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { connect, useDispatch } from "react-redux";
import {
  openAddEventDrawer,
  removeCoachingSchedule,
  showModal,
  hideModal,
  updateCoachingScheduleStatus,
} from "../../actions";
import { isDayBehind, isMeetingAvailable } from "../../utils";
import classNames from "clsx";

import _ from "lodash";

const WeekTableCell = withStyles(({ palette }) => ({
  dayBehindCell: {
    backgroundColor: fade(palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
  },
}))(({ classes, onCellClick, ...restProps }) => {
  const isCellDisabled = isDayBehind(restProps.startDate);
  return (
    <WeekView.TimeTableCell
      className={classNames({
        [classes.dayBehindCell]: isCellDisabled,
      })}
      onClick={() => {
        if (!isCellDisabled) {
          onCellClick(restProps);
        }
      }}
      {...restProps}
    />
  );
});

const DayTableCell = withStyles(({ palette }) => ({
  dayBehindCell: {
    backgroundColor: fade(palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
  },
}))(({ classes, onCellClick, ...restProps }) => {
  const isCellDisabled = isDayBehind(restProps.startDate);
  return (
    <DayView.TimeTableCell
      className={classNames({
        [classes.dayBehindCell]: isCellDisabled,
      })}
      onClick={() => {
        if (!isCellDisabled) {
          onCellClick(restProps);
        }
      }}
      {...restProps}
    />
  );
});

const MonthTableCell = withStyles(({ palette }) => ({
  dayBehindCell: {
    backgroundColor: fade(palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
  },
}))(({ classes, onCellClick, ...restProps }) => {
  const isCellDisabled = isDayBehind(restProps.startDate);
  return (
    <MonthView.TimeTableCell
      className={classNames({
        [classes.dayBehindCell]: isCellDisabled,
      })}
      onClick={() => {
        if (!isCellDisabled) {
          onCellClick(restProps);
        }
      }}
      {...restProps}
    />
  );
});

const AppointmentTooltipHeader = withStyles({
  teacherTitle: {
    margin: "0.5em 0",
  },
})(({ children, appointmentData, classes, accessType, ...restProps }) => {
  const dispatch = useDispatch();

  const onDialogClose = () => {
    dispatch(hideModal());
  };

  const removeSchedule = () => {
    dispatch(hideModal());
    restProps.onHide();
    dispatch(removeCoachingSchedule(appointmentData.eventId));
  };

  const handleOnDeleteButton = () => {
    dispatch(
      showModal("CONFIRMATION_MODAL", {
        onDialogClose: onDialogClose,
        title: `Remove ${appointmentData.title}?`,
        content: "Are you sure you want to remove this schedule?",
        onNegativeClick: onDialogClose,
        onPositiveClick: () => removeSchedule(),
      })
    );
  };

  return (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <Grid container justify="flex-end" direction="column">
        <Grid
          className={classes.teacherTitle}
          item
          container
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Typography variant="h6" align="center">
            {appointmentData.teacher.fullName}
          </Typography>
          <Typography variant="caption" align="center">
            {appointmentData.teacher.email}
          </Typography>
        </Grid>
      </Grid>
    </AppointmentTooltip.Header>
  );
});

const AppointmentTooltipContent = withStyles({
  container: {
    width: "100%",
  },
  meetingButtonWrapper: {
    margin: "1em 0",
  },
  meetingButton: {
    margin: "1em",
    backgroundColor: "#109083",
    color: "white",
  },
  meetingLink: {
    fontSize: "0.8rem",
  },
  acceptMeetingButton: {
    margin: "1em",
    backgroundColor: "blue",
    color: "white",
  },
  denyMeetingButton: {
    margin: "1em",
    backgroundColor: "red",
    color: "white",
  },
})(
  ({
    children,
    appointmentData,
    onUpdateStatusButtonPressed,
    accessType,
    classes,
    ...restProps
  }) => {
    const renderContent = () => {
      if (
        appointmentData.status === "denied" ||
        appointmentData.status === "overdue" ||
        appointmentData.status === "cancelled"
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

      const dayBehind = isDayBehind(new Date(appointmentData.endDate));
      const meetingAvailable = isMeetingAvailable(
        new Date(appointmentData.startDate),
        new Date(appointmentData.endDate)
      );

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
              window.open(appointmentData.meetingLink, "_blank");
            }}
            variant="contained"
            startIcon={<DuoIcon />}
          >
            Join Google Meet
          </Button>
          <Typography
            display={meetingAvailable || dayBehind ? "none" : ""}
            align="center"
            variant="subtitle2"
          >
            {!meetingAvailable || dayBehind ? "" : appointmentData.meetingLink}
          </Typography>
          <Button
            className={classes.denyMeetingButton}
            onClick={() => {
              onUpdateStatusButtonPressed(
                appointmentData.coachingSessionId,
                "cancelled"
              );
            }}
            variant="contained"
          >
            Cancel
          </Button>
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
          {renderContent()}
        </Grid>
      </AppointmentTooltip.Content>
    );
  }
);

const CustomScheduler = ({
  coachingSchedules,
  openAddEventDrawer,
  accessType,
  loggedInStudentEmail,
  showModal,
  hideModal,
  updateCoachingScheduleStatus,
}) => {
  const studentInstances = _.flatten(
    coachingSchedules.map((schedule) =>
      schedule.studentAttendees.map((student) => {
        return {
          text:
            loggedInStudentEmail !== student.email ? student.fullName : "You",
          id: student.email,
          color: "red",
        };
      })
    )
  );
  const today = new Date();

  const statuses = [
    {
      text: "Pending",
      id: "pending",
      color: "#ffeb3b",
    },
    {
      text: "Finished",
      id: "finished",
      color: "#2e7d32",
    },
    {
      text: "Cancelled",
      id: "cancelled",
      color: "#b71c1c",
    },
    {
      text: "Request Denied",
      id: "denied",
      color: "#b71c1c",
    },
    {
      text: "Waiting For Response",
      id: "waiting_for_response",
      color: "#ffff6b",
    },
    {
      text: "Overdue",
      id: "overdue",
      color: "#e65100",
    },
  ];

  const resources = [
    {
      fieldName: "status",
      title: "Status",
      instances: statuses,
    },
    {
      fieldName: "students",
      title: "Students",
      allowMultiple: true,
      instances: studentInstances,
    },
  ];

  const currentDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const onDialogClose = () => {
    hideModal();
  };
  const onUpdateStatusButtonPressed = (eventId, status) => {
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
      onPositiveClick: () => updateCoachingScheduleStatus(eventId, status),
    });
  };

  const weekTableCell = connectProps(WeekTableCell, () => {
    return {
      onCellClick: openAddEventDrawer,
    };
  });

  const monthTableCell = connectProps(MonthTableCell, () => {
    return {
      onCellClick: openAddEventDrawer,
    };
  });

  const dayTableCell = connectProps(DayTableCell, () => {
    return {
      onCellClick: openAddEventDrawer,
    };
  });

  const appointmentHeader = connectProps(AppointmentTooltipHeader, () => {
    return { accessType };
  });

  const appointmentContent = connectProps(AppointmentTooltipContent, () => {
    return { accessType, onUpdateStatusButtonPressed };
  });

  return (
    <Scheduler
      height="auto"
      data={coachingSchedules}
      onCellClick={openAddEventDrawer}
    >
      <Toolbar />
      <ViewState
        defaultCurrentDate={currentDate}
        defaultCurrentViewName="Week"
      />

      <ViewSwitcher />
      <MonthView timeTableCellComponent={monthTableCell} />
      <DayView
        startDayHour={1}
        endDayHour={24}
        d
        timeTableCellComponent={dayTableCell}
      />
      <WeekView
        startDayHour={1}
        endDayHour={24}
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={weekTableCell}
      />
      <DateNavigator />
      <TodayButton />
      <Appointments />
      <Resources data={resources} mainResourceName="status" />
      <AppointmentTooltip
        contentComponent={appointmentContent}
        headerComponent={appointmentHeader}
      />
    </Scheduler>
  );
};

const mapStateToProps = (state) => {
  return {
    coachingSchedules: state.coaching.coachingSchedules,
    loggedInStudentEmail: state.auth.data?.user?.email,
  };
};
export default connect(mapStateToProps, {
  openAddEventDrawer,
  updateCoachingScheduleStatus,
  showModal,
  hideModal,
})(CustomScheduler);
