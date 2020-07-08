import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  TextField,
  createMuiTheme,
  ThemeProvider,
  Grid,
  InputLabel,
  Divider,
} from "@material-ui/core";
import AutoComplete from "@material-ui/lab/Autocomplete";
import CustomDatePicker from "../../custom/CustomDatePicker";
import CustomTimePicker from "../../custom/CustomTimePicker";
import CustomTextField from "../../custom/CustomTextField";

const useStyles = makeStyles(() => ({}));

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
  margin: "1em",
});

const StyledTimePicker = styled(TextField)({
  margin: "1em",
});

const StyledAddTitle = styled(TextField)({
  margin: "1em",
});

const AddEventForm = (props) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={formTheme}>
      <form>
        <Divider />
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
        <Divider />
        <AutoComplete
          options={[{ title: "hehe" }]}
          getOptionLabel={(option) => option.title}
          renderInput={(props) => <TextField {...props} variant="outlined" />}
        />
        <Divider />
      </form>
    </ThemeProvider>
  );
};

export default reduxForm({
  form: "AddEventDrawerForm",
  validate: validateDates,
  enableReinitialize: true,
})(AddEventForm);
