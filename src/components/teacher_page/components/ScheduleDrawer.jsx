import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  Drawer,
  Typography,
  Grid,
  TextField,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import CustomDatePicker from "../../custom/CustomDatePicker";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { closeAddEventDrawer } from "../../../actions";
import CustomTimePicker from "../../custom/CustomTimePicker";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#95A3B3",
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  timePicker: {
    margin: "1em",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "#000000",
        color: "white",
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: "#212642",
      },
    },
    MuiPickersCalendar: {
      daysHeader: {
        backgroundColor: "#84DCC6",
      },
      weekDayLabel: {
        color: "black",
      },
    },
    MuiPickersArrowSwitcher: {
      iconButton: {
        color: "white",
        backgroundColor: "#3f51b5",
      },
    },
    MuiPickersDay: {
      day: {
        color: "white",
        backgroundColor: "#212642",
      },
      daySelected: {
        backgroundColor: "#3f51b5",
      },
      dayDisabled: {
        color: "red",
      },
      today: {
        color: "#84DCC6",
      },
    },
  },
});

const StyledDatePicker = styled(TextField)({
  margin: "1em",
});

const StyledTimePicker = styled(TextField)({
  margin: "1em",
});

const validateDates = (values) => {
  const errors = {};
  const requiredFields = [
    "title",
    "description",
    "startDate",
    "endDate",
    "startTime",
    "endTime",
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required!";
    }
  });

  if (
    values.endTime &&
    /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/gm.test(values.endTime)
  ) {
    errors.endTime = "Invalid Time Format";
  }

  if (
    values.startTime &&
    /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/gm.test(values.startTime)
  ) {
    errors.startTime = "Invalid Time Format";
  }
  return errors;
};

const ScheduleDrawer = ({ addEventDrawerData, closeAddEventDrawer }) => {
  const { isOpen, selectedDate } = addEventDrawerData;
  const classes = useStyles();

  const renderContent = () => {
    if (selectedDate) {
      return (
        <Grid>
          <ThemeProvider theme={formTheme}>
            <form>
              <Field
                label="Start Date"
                name="startDate"
                dateFormat="MM/dd/yyyy"
                inputComponent={StyledDatePicker}
                component={CustomDatePicker}
              />
              <Field
                inputComponent={StyledDatePicker}
                label="End Date"
                name="endDate"
                dateFormat="MM/dd/yyyy"
                component={CustomDatePicker}
              />
              <Field
                inputComponent={StyledTimePicker}
                label="Start Time"
                name="startTime"
                component={CustomTimePicker}
              />
              <Field
                inputComponent={StyledTimePicker}
                label="End Time"
                name="endTime"
                component={CustomTimePicker}
              />
            </form>
          </ThemeProvider>
        </Grid>
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        open={isOpen}
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={closeAddEventDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        {renderContent()}
      </Drawer>
    </div>
  );
};
const mapStateToProps = (state) => {
  const selectedDate = state.drawer.addEventDrawer.selectedDate;

  return {
    addEventDrawerData: state.drawer.addEventDrawer,
    initialValues: {
      startDate: selectedDate?.startDate,
      endDate: selectedDate?.endDate,
      startTime: selectedDate?.startDate,
      endTime: selectedDate?.endDate,
    },
  };
};

const ScheduleDrawerWithReduxForm = reduxForm({
  form: "AddEventDrawerForm",
  validate: validateDates,
  enableReinitialize: true,
})(ScheduleDrawer);

export default connect(mapStateToProps, {
  closeAddEventDrawer,
})(ScheduleDrawerWithReduxForm);
