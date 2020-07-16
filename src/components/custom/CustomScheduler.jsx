import React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { connectProps } from "@devexpress/dx-react-core";
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
} from "../../actions";
import classNames from "clsx";
import _, { rest } from "lodash";

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

const WeekTableCell = withStyles({})(({ onCellClick, ...restProps }) => {
  return (
    <WeekView.TimeTableCell
      onClick={() => {
        onCellClick(restProps);
      }}
      {...restProps}
    />
  );
});

const DayTableCell = withStyles({})(({ onCellClick, ...restProps }) => {
  return (
    <DayView.TimeTableCell
      onClick={() => {
        onCellClick(restProps);
      }}
      {...restProps}
    />
  );
});

const MonthTableCell = withStyles({})(({ onCellClick, ...restProps }) => {
  return (
    <MonthView.TimeTableCell
      onClick={() => {
        onCellClick(restProps);
      }}
      {...restProps}
    />
  );
});

const AppointmentTooltipHeader = withStyles({})(
  ({ children, appointmentData, classes, accessType, ...restProps }) => {
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
          {accessType === "student" ? null :   <IconButton onClick={handleOnDeleteButton}>
            <DeleteIcon />
          </IconButton>}
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


const CustomScheduler = ({ coachingSchedules, openAddEventDrawer, accessType }) => {
  const today = new Date();
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
   return { accessType}
  })

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
        contentComponent={AppointmentTooltipContent}
        headerComponent={appointmentHeader}
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
})(CustomScheduler);
