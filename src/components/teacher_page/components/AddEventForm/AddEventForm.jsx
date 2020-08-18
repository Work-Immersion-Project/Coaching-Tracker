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
import { useForm, Controller } from "react-hook-form";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  textField: {
    width: "100%",
    margin: "1em 0",
  },
  addStudentsField: {
    margin: "0.5em 0",
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
  },
});

const StyledDatePicker = styled(TextField)({
  margin: "0.5em 0",
});

const StyledTimePicker = styled(TextField)({
  margin: "0.5em 0",
});

const AddEventForm = ({
  hideModal,
  closeAddEventDrawer,
  students,
  showModal,
  selectedDate,
  getStudentsRequest,
  addCoachingSessionRequest,
}) => {
  const { handleSubmit, register, control, errors } = useForm();
  const [isStudentListOpened, setStudentListState] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (isStudentListOpened) {
      getStudentsRequest(true);
    }
  }, [isStudentListOpened, getStudentsRequest]);

  const onDialogClose = () => {
    hideModal();
  };

  const addCoachingEvent = (coachingDetails) => {
    addCoachingSessionRequest(coachingDetails);
    closeAddEventDrawer();
  };

  const handleOnSubmit = (coachingDetails) => {
    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Schedule Coaching?",
      content:
        "Make sure that you have entered the correct information before proceeding.",
      onNegativeClick: onDialogClose,
      onPositiveClick: () => addCoachingEvent(coachingDetails),
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
          defaultValue=""
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
          defaultValue={selectedDate.endDate}
        />
        <Divider className={classes.divider2} />
        <Controller
          name="studentAttendees"
          defaultValue={[]}
          control={control}
          rules={{
            validate: (studentAttendees = []) => studentAttendees.length !== 0,
          }}
          render={(props) => {
            return (
              <Autocomplete
                options={students !== null ? students : []}
                loading={isStudentListOpened && students === null}
                getOptionLabel={(option) => option.email}
                multiple
                filterSelectedOptions
                size={"small"}
                onChange={(_, data) => {
                  props.onChange(data);
                }}
                onOpen={() => {
                  setStudentListState(true);
                }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    className={classes.addStudentsField}
                    error={errors.studentAttendees !== undefined}
                    label="Add Students"
                    helperText={
                      errors.studentAttendees !== undefined ? "Required" : ""
                    }
                    InputProps={{
                      ...props.InputProps,
                      endAdornment: (
                        <>
                          {isStudentListOpened && students === null ? (
                            <CircularProgress size={20} />
                          ) : null}
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

export default AddEventForm;
