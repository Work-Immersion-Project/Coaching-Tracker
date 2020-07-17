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
  confirmCoachingSchedule,
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
  headerFontColor: {
    color: "#84DCC6"
  },
  emailFontColor: {
    color: "white"
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
          <Typography className = {classes.headerFontColor} variant="h6" align="center">
            {appointmentData.teacher.fullName}
          </Typography>
          <Typography className = {classes.emailFontColor} variant="caption" align="center">
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
    ...restProps
  }) => {
    const renderConfirmationButton = () => {
      if(loggedInUser.type === "teacher"){
        return <Button
        className={classes.acceptMeetingButton}
        onClick={() => {
          confirmCoachingSchedule(appointmentData.coachingSessionId);
        }}
        variant="contained"
      >
        Finish Session
      </Button>
      } else if (loggedInUser.type === "student"){
        let disabled = true;
  
        if(appointmentData.studentsConfirmed){
          disabled = !appointmentData.studentsConfirmed.filter((student) => student.email === loggedInUser.email).length === 0;
        }
  
        return <Button
        disabled={disabled}
        className={classes.acceptMeetingButton}
        onClick={() => {
          confirmCoachingSchedule(appointmentData.coachingSessionId);
        }}
        variant="contained"
      >
        Finish Session
      </Button>
      }
    }
  
    const renderContent = () => {
      if (
        appointmentData.status === "denied" ||
        appointmentData.status === "overdue" ||
        appointmentData.status === "cancelled"||
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

      if(appointmentData.status === 'ongoing' ){
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
          
            align="center"
            variant="subtitle2"
          >
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
              if(loggedInUser.type !== "student"){

                onUpdateStatusButtonPressed(   appointmentData.coachingSessionId,
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
          <Typography

            align="center"
            variant="subtitle2"
          >
            {!meetingAvailable || dayBehind ? "" : appointmentData.meetingLink}
          </Typography>
         
       {loggedInUser.type !== "student" ?  <Button
          className={classes.denyMeetingButton}
          onClick={() => {
            onUpdateStatusButtonPressed(appointmentData.coachingSessionId,
              "cancelled"
            );
          }}
          variant="contained"
        >
          Cancel
        </Button> : null}
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

const AppointmentContent = withStyles({
  title: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: "white"
  },
  textContainer: {
    lineHeight: 1,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  time: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: "white"
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: "white"
  },
  container: {
    width: '100%',
  },
})(({    children,
  appointmentData,
  data,
  classes,
  formatDate,
  ...restProps}) => {
    return <Appointments.Container formatDate={formatDate} data={data} {...restProps}>
      <div className={classes.container}>
    <div className={classes.title}>
      {data.title}
    </div>
    <div className={classes.text}>
      {data.location}
    </div>
    <div className={classes.textContainer}>
      <div className={classes.time}>
        {formatDate(data.startDate.toString(), { hour: 'numeric', minute: 'numeric' })}
      </div>
      <div className={classes.time}>
        {' - '}
      </div>
      <div className={classes.time}>
        {formatDate(data.endDate.toString(), { hour: 'numeric', minute: 'numeric' })}
      </div>
    </div>
  </div></Appointments.Container>;
})

const CustomScheduler = ({
  coachingSchedules,
  openAddEventDrawer,
  accessType,
  loggedInStudentEmail,
  showModal,
  hideModal,
  updateCoachingScheduleStatus,
  loggedInUser,
  confirmCoachingSchedule,
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
      color: "#8C7E10",
    },
    {
      text: "Finished",
      id: "finished",
      color: "#2e7d32",
    },
    {
      text: "Cancelled",
      id: "cancelled",
      color: "#7A1313",
    },
    {
      text: "Request Denied",
      id: "denied",
      color: "#7A1313",
    },
    {
      text: "Waiting For Response",
      id: "waiting_for_response",
      color: "#BDA911",
    },
    {
      text: "Overdue",
      id: "overdue",
      color: "#C87142",
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
    if(status === "ongoing"){
      updateCoachingScheduleStatus(eventId,status)  ;
    } else {
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
    }
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
    return { accessType, onUpdateStatusButtonPressed , loggedInUser,confirmCoachingSchedule};
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
        startDayHour={0}
        endDayHour={24}
        d
        timeTableCellComponent={dayTableCell}
      />
      <WeekView
        startDayHour={0}
        endDayHour={24}
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={weekTableCell}
      />
      <DateNavigator />
      <TodayButton />
      <Appointments appointmentContentComponent={AppointmentContent} />
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
    loggedInUser: state.auth.data.user,
  };
};
export default connect(mapStateToProps, {
  openAddEventDrawer,
  updateCoachingScheduleStatus,
  showModal,
  hideModal,confirmCoachingSchedule
})(CustomScheduler);
