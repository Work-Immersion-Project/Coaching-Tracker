import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  getStudents,
  addCoachingAttendee,
  addCoachingSchedule,
  showModal,
  hideModal,
  closeAddEventDrawer,
  getStudentsBySubject,
} from "../../../actions";
import {
  TextField,
  createMuiTheme,
  ThemeProvider,
  Grid,
  InputLabel,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import AddEventStudentList from "./AddEventStudentList";
import AutoComplete from "@material-ui/lab/Autocomplete";
import CustomDatePicker from "../../custom/CustomDatePicker";
import CustomTimePicker from "../../custom/CustomTimePicker";
import CustomMaterialTextField from "../../custom/CustomMaterialTextField";

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
  },
});

const StyledDatePicker = styled(TextField)({
  margin: "0.5em 0",
});

const StyledTimePicker = styled(TextField)({
  margin: "0.5em 0",
});

const StyledAddTitle = styled(TextField)({
  margin: "0.5em 0",
});

const AddEventForm = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [addStudentFieldValue, setAddStudentFieldValue] = useState("");
  const { handleSubmit, reset, pristine, submitting } = props;
  const classes = useStyles();
  const loading = props.students === null && isOpen;

  useEffect(() => {
    if (isOpen) {
      props.getStudents();
    }
  }, [isOpen, props.student]);

  const handleOnStudentClick = (student) => {
    setAddStudentFieldValue("");
    props.addCoachingAttendee(student);
  };

  const onDialogClose = () => {
    props.hideModal();
  };

  const addCoachingEvent = (values) => {
    props.addCoachingSchedule(values);
    props.closeAddEventDrawer();
  };

  const handleOnSubmit = (values) => {
    props.showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Schedule Coaching?",
      content:
        "Make sure that you have entered the correct information before proceeding.",
      onNegativeClick: onDialogClose,
      onPositiveClick: () => addCoachingEvent(values),
    });
  };

  return (
    <ThemeProvider theme={formTheme}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Field
          label="Add Title"
          name="title"
          inputComponent={StyledAddTitle}
          component={CustomMaterialTextField}
          InputLabelProps={{ classes: { root: classes.fontColor } }}
          InputProps={{ classes: { notchedOutline: classes.fontColor } }}
        />

        <Divider />
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
        <Divider />
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
        <Divider />
        <AutoComplete
          className={classes.addStudentsField}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={(_, reason) => {
            if (reason === "select-option") {
              setAddStudentFieldValue("");
            }
            setOpen(false);
          }}
          inputValue={addStudentFieldValue}
          onInputChange={(_, input, reason) => {
            if (reason === "input") {
              setAddStudentFieldValue(input);
            }
          }}
          disableClearable
          loading={loading}
          options={props.students ? props.students : []}
          // options={
          //   props.students
          //     ? props.students.filter(
          //         (student) =>
          //           props.addedStudents.filter(
          //             (addedStudent) => student.email === addedStudent.email
          //           ).length === 0
          //       )
          //     : []
          // }
          onChange={(_, value, reason) => {
            if (reason === "select-option") {
              handleOnStudentClick(value);
            }
          }}
          getOptionLabel={(option) => option.email}
          noOptionsText="No Students Found"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add Students"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <AddEventStudentList className={classes.addedStudentsList} />
        <Divider />
        <Button
          type="submit"
          disabled={pristine || (submitting && props.addedStudents.length == 0)}
        >
          Create Coaching Schedule
        </Button>
      </form>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students.data,
    addedStudents: state.coaching.selectedStudentAttendees,
  };
};

const AddEventFormWithReduxForm = reduxForm({
  form: "AddEventDrawerForm",
  validate: validateDates,
  enableReinitialize: true,
})(AddEventForm);

export default connect(mapStateToProps, {
  getStudents,
  addCoachingAttendee,
  addCoachingSchedule,
  showModal,
  hideModal,
  closeAddEventDrawer,
  getStudentsBySubject,
})(AddEventFormWithReduxForm);
