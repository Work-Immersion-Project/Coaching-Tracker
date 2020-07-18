import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  getTeachersBySubject,
  showModal,
  hideModal,
  closeAddEventDrawer,
  requestCoachingSchedule,
} from "../../../actions";
import {
  TextField,
  createMuiTheme,
  ThemeProvider,
  Button,
  Divider,
} from "@material-ui/core";

import CustomDatePicker from "../../custom/CustomDatePicker";
import CustomTimePicker from "../../custom/CustomTimePicker";
import CustomMaterialTextField from "../../custom/CustomMaterialTextField";
import CustomAutoComplete from "../../custom/CustomAutocomplete";

const useStyles = makeStyles(() => ({
  textField: {
    width: "100%",
    margin: "1em 0",
  },
  addStudentsField: {
    margin: "1em 0",
  },
  addedStudentsList: {
    width: "100%",
  },
  fontColor: {
    color: "white",
    borderColor: "white",
  },
  button: {
    minWidth: "270px",
  },

  divider: {
    marginTop: "1em",
    marginBottom: "0.5em",
    backgroundColor: "#95a3b3",
  },

  divider2: {
    marginBottom: "0.5em",
    backgroundColor: "#95a3b3",
  },
}));

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

  if (!values.studentAttendees) {
    errors.studentAttendees = "Required!";
  }

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

    MuiPickersClockNumber: {
      clockNumber: {
        color: "white",
      },
    },

    MuiInputLabel: {
      root: {
        color: "white",
        "&$focused": {
          color: "#84DCC6",
        },
      },
    },

    MuiInput: {
      root: {
        color: "white",
      },
      underline: {
        minWidth: "270px",
        "&:before": {
          borderBottom: "1px solid rgba(132, 220, 198, 1)",
        },
        "&:after": {
          borderBottom: `2px solid rgba(132, 220, 198, 1)`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid rgba(132, 220, 198, 1)`,
        },
      },
    },

    MuiIconButton: {
      root: {
        color: "#84DCC6",
      },
    },

    MuiFormHelperText: {
      root: {
        color: "#84DCC6",
      },
    },

    MuiPaper: {
      root: {
        backgroundColor: "#222222",
        color: "white",
      },
    },
  },

  MuiButton: {
    root: {
      backgroundColor: "#84DCC6",
      "&:hover": {
        backgroundColor: "#52aa95",
        "@media (hover: none)": {
          backgroundColor: "#84DCC6",
        },
      },
    },
    text: {
      color: "#000000",
    },
  },
});

const StyledDatePicker = styled(TextField)({
  margin: "0.5em 0",
});

const StyledTimePicker = styled(TextField)({
  margin: "0.5em 0",
});

const RequestEventForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  const {
    getTeachersBySubject,
    hideModal,
    showModal,
    requestCoachingSchedule,
    closeAddEventDrawer,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    getTeachersBySubject();
  }, [getTeachersBySubject]);

  const onDialogClose = () => {
    hideModal();
  };

  const requestCoachingEvent = (values) => {
    requestCoachingSchedule(values);
    closeAddEventDrawer();
  };

  const handleOnSubmit = (values) => {
    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Request Coaching?",
      content:
        "Make sure that you have entered the correct information before proceeding.",
      onNegativeClick: onDialogClose,
      onPositiveClick: () => requestCoachingEvent(values),
    });
  };

  return (
    <ThemeProvider theme={formTheme}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Field
          label="Add Title"
          name="title"
          component={CustomMaterialTextField}
        />

        <Divider className={classes.divider} />
        <Field
          label="Start Date"
          name="startDate"
          dateFormat="MM/dd/yyyy"
          inputComponent={StyledDatePicker}
          component={CustomDatePicker}
        />
        <Field
          inputComponent={StyledTimePicker}
          label="Start Time"
          name="startTime"
          component={CustomTimePicker}
        />
        <Divider className={classes.divider2} />
        <Field
          inputComponent={StyledDatePicker}
          label="End Date"
          name="endDate"
          dateFormat="MM/dd/yyyy"
          component={CustomDatePicker}
        />
        <Field
          inputComponent={StyledTimePicker}
          label="End Time"
          name="endTime"
          component={CustomTimePicker}
        />
        <Divider className={classes.divider2} />
        <Field
          name="teacherAttendee"
          multiple={false}
          limitTags={1}
          getOptionLabel={(option) => option.email}
          component={CustomAutoComplete}
          inputComponent={TextField}
          options={props.teachers ? props.teachers : []}
        />

        <Divider className={classes.divider2} />
        <Button
          type="submit"
          className={classes.button}
          disabled={pristine || submitting}
        >
          Create Coaching Schedule
        </Button>
      </form>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    teachers: state.teachers.data,
  };
};

const RequestEventFormWithReduxForm = reduxForm({
  form: "AddEventDrawerForm",
  validate: validateDates,
  enableReinitialize: true,
})(RequestEventForm);

export default connect(mapStateToProps, {
  showModal,
  hideModal,
  closeAddEventDrawer,
  requestCoachingSchedule,
  getTeachersBySubject,
})(RequestEventFormWithReduxForm);
