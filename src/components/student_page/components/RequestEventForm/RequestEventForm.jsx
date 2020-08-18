import React, { useEffect } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  TextField,
  createMuiTheme,
  ThemeProvider,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { useForm, Controller } from "react-hook-form";

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
        backgroundColor: "black",
      },
      weekDayLabel: {
        color: "white",
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
        "&:hover": {
          backgroundColor:"#3f51b5",
        },
        "&:focus": {
          backgroundColor: "#3f51b5",
        },
        color: "white",
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
          color: "#4EC8F4",
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
          borderBottom: "1px solid rgba(78,200,244, 1)",
        },
        "&:after": {
          borderBottom: `2px solid rgba(78,200,244, 1)`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid rgba(78,200,244, 1)`,
        },
      },
    },

    MuiIconButton: {
      root: {
        color: "#4EC8F4",
      },
    },

    MuiFormHelperText: {
      root: {
        color: "#4EC8F4",
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
      backgroundColor: "#4EC8F4",
      "&:hover": {
        backgroundColor: "#0097c1",
        "@media (hover: none)": {
          backgroundColor: "#4EC8F4",
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

const RequestEventForm = ({
  selectedDate,
  getTeachers,
  showModal,
  hideModal,
  teachers,
  requestCoachingSession,
  closeAddEventDrawer,
}) => {
  const { handleSubmit, register, errors, control } = useForm();

  const classes = useStyles();

  useEffect(() => {
    getTeachers(true);
  }, [getTeachers]);

  const onDialogClose = () => {
    hideModal();
  };

  const requestCoachingEvent = (values) => {
    requestCoachingSession(values);
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
        <TextField
          name="title"
          label="Add Title"
          inputRef={register({ required: true })}
          error={errors.title !== undefined}
          helperText={errors.title !== undefined ? "Required" : ""}
        />
        <Divider className={classes.divider} />
        <Controller
          as={DatePicker}
          label="Start Date"
          control={control}
          renderInput={(props) => (
            <StyledDatePicker {...props} name="startDate" />
          )}
          name="startDate"
          inputRef={register({
            required: true,
          })}
          allowKeyboardControl={false}
          disablePast
          defaultValue={selectedDate.startDate}
        />
        <Controller
          as={TimePicker}
          label="Start Time"
          control={control}
          renderInput={(props) => (
            <StyledTimePicker {...props} name="startTime" />
          )}
          name="startTime"
          inputRef={register({
            required: true,
          })}
          allowKeyboardControl={false}
          defaultValue={selectedDate.startDate}
        />
        <Divider className={classes.divider2} />
        <Controller
          as={DatePicker}
          label="End Date"
          control={control}
          renderInput={(props) => (
            <StyledDatePicker {...props} name="endDate" />
          )}
          name="endDate"
          inputRef={register({
            required: true,
          })}
          allowKeyboardControl={false}
          disablePast
          defaultValue={selectedDate.endDate}
        />
        <Controller
          as={TimePicker}
          label="End Time"
          control={control}
          renderInput={(props) => (
            <StyledTimePicker {...props} name="endTime" />
          )}
          name="endTime"
          inputRef={register({
            required: true,
          })}
          allowKeyboardControl={false}
          defaultValue={selectedDate.endDate}
        />
        <Divider className={classes.divider2} />
        <Controller
          name="teacher"
          defaultValue={[]}
          control={control}
          rules={{
            validate: (teacher = "") => teacher !== "",
          }}
          render={(props) => {
            return (
              <Autocomplete
                options={teachers !== null ? teachers : []}
                loading={teachers === null}
                getOptionLabel={(option) => option.email}
                filterSelectedOptions
                size={"small"}
                onChange={(_, data) => {
                  props.onChange(data);
                }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    className={classes.addStudentsField}
                    error={errors.teacher !== undefined}
                    label="Teacher"
                    helperText={errors.teacher !== undefined ? "Required" : ""}
                    InputProps={{
                      ...props.InputProps,
                      endAdornment: (
                        <>
                          {teachers != null ? null : (
                            <CircularProgress size={20} />
                          )}
                        </>
                      ),
                    }}
                  />
                )}
              />
            );
          }}
        />

        <Button type="submit" className={classes.button}>
          Create Coaching Schedule
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default RequestEventForm;
