import React from "react";
import { ViewState, GroupingState } from "@devexpress/dx-react-scheduler";
import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import DuoIcon from "@material-ui/icons/Duo";
import DeleteIcon from "@material-ui/icons/Delete";
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
import { withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import {
  openAddEventDrawer,
  removeCoachingSchedule,
  showModal,
  hideModal,
} from "../../../actions";
import classNames from "clsx";
import _ from "lodash";

const handleCellOnClick = (cellValues) => {
  cellValues.dispatch(openAddEventDrawer(cellValues));
};

const appointmentStyles = {
  pendingCell: {
    backgroundColor: "yellow",
  },
  finishedCell: {
    backgroundColor: "green",
  },
  overDueCell: {
    backgroundColor: "red",
  },
};

const WeekTableCell = withStyles(appointmentStyles)((props) => {
  const dispatch = useDispatch();
  return (
    <WeekView.TimeTableCell
      {...props}
      onClick={() => {
        handleCellOnClick({ ...props, dispatch });
      }}
    />
  );
});

const DayTableCell = withStyles(appointmentStyles)((props) => {
  const dispatch = useDispatch();
  return (
    <DayView.TimeTableCell
      {...props}
      onClick={() => {
        handleCellOnClick({ ...props, dispatch });
      }}
    />
  );
});

const MonthTableCell = withStyles(appointmentStyles)((props) => {
  const dispatch = useDispatch();
  return (
    <MonthView.TimeTableCell
      {...props}
      onClick={() => {
        handleCellOnClick({ ...props, dispatch });
      }}
    />
  );
});

const AppointmentTooltipHeader = withStyles({})(
  ({ children, appointmentData, classes, ...restProps }) => {
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
      <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid container justify="flex-end">
          <IconButton onClick={handleOnDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </AppointmentTooltip.Header>
    );
  }
);

const AppointmentTooltipContent = withStyles({
  container: {
    width: "100%",
  },
  meetingButton: {
    margin: "1em",
    backgroundColor: "#109083",
    color: "white",
  },
  meetingLink: {
    fontSize: "0.8rem",
  },
})(({ children, appointmentData, classes, ...restProps }) => {
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
        <Button
          className={classes.meetingButton}
          onClick={() => {
            window.open(appointmentData.meetingLink, "_blank");
          }}
          variant="contained"
          startIcon={<DuoIcon />}
        >
          Join Google Meet
        </Button>
        <Typography className={classes.meetingLink} component="p">
          {appointmentData.meetingLink}
        </Typography>
      </Grid>
    </AppointmentTooltip.Content>
  );
});

const AppointmentContent = withStyles(appointmentStyles)(
  ({ classes, data, formatDate, ...restProps }) => {
    return (
      <Appointments.AppointmentContent
        {...restProps}
        className={classNames({
          [classes.pendingCell]: data.status === "pending",
          [classes.finishedCell]: data.status === "finished",
          [classes.overDueCell]: data.status === "overdue",
        })}
        formatDate={formatDate}
        data={data}
      >
        <Grid container alignItems="center">
          <Typography>{data.title}</Typography>
          <Typography>
            {formatDate(data.startDate.toString(), {
              hour: "numeric",
              minute: "numeric",
            })}
          </Typography>
          <Typography>{" - "}</Typography>
          <Typography>
            {formatDate(data.endDate.toString(), {
              hour: "numeric",
              minute: "numeric",
            })}
          </Typography>
        </Grid>
      </Appointments.AppointmentContent>
    );
  }
);

const TeacherScheduler = ({ coachingSchedules, openAddEventDrawer }) => {
  const today = new Date();

  const statuses = [
    {
      text: "Pending",
      id: "pending",
      color: "yellow",
    },
    {
      text: "Finished",
      id: "finished",
      color: "green",
    },
    {
      text: "Overdue",
      id: "overdue",
      color: "red",
    },
  ];

  const resources = [
    {
      fieldName: "status",
      title: "Status",
      instances: statuses,
    },
  ];
  const currentDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return (
    <Scheduler height="auto" data={coachingSchedules}>
      <Toolbar />
      <ViewState
        defaultCurrentDate={currentDate}
        defaultCurrentViewName="Week"
      />

      <ViewSwitcher />
      <MonthView
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={MonthTableCell}
      />
      <DayView
        startDayHour={1}
        endDayHour={24}
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={DayTableCell}
      />
      <WeekView
        startDayHour={1}
        endDayHour={24}
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={WeekTableCell}
      />
      <DateNavigator />
      <TodayButton />
      <Appointments />
      <Resources data={resources} mainResourceName="status" />
      <AppointmentTooltip
        contentComponent={AppointmentTooltipContent}
        headerComponent={AppointmentTooltipHeader}
      />
    </Scheduler>
  );
};

const mapStateToProps = (state) => {
  return {
    coachingSchedules: state.coaching.coachingSchedules,
  };
};
export default connect(mapStateToProps, {
  openAddEventDrawer,
})(TeacherScheduler);
