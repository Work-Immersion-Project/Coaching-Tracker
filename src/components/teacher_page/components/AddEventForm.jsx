import React, {useState, useEffect} from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { makeStyles, styled } from "@material-ui/core/styles";
import {getStudents} from "../../../actions";
import {
  TextField,
  createMuiTheme,
  ThemeProvider,
  Grid,
  InputLabel,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import AutoComplete from "@material-ui/lab/Autocomplete";
import CustomDatePicker from "../../custom/CustomDatePicker";
import CustomTimePicker from "../../custom/CustomTimePicker";
import CustomTextField from "../../custom/CustomTextField";

const useStyles = makeStyles(() => ({
  textField: {
    width: "100%",
    margin: "1em 0",
  },
  addStudentsField: {
    margin: "1em 0",
  },
  addedStudentsList:{
    width: "100%",
  }
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
  const [addedStudents, setAddedStudents] = useState([]);
  const classes = useStyles();
  const loading = props.students === null && isOpen;

  useEffect(() => {
   if(isOpen){
    props.getStudents();
   }

  }, [isOpen, props.student]);
  const handleStudentRemove = (studentToBeRemove) => {
    setAddedStudents(addedStudents.filter((student) => student.email !== studentToBeRemove.email))
  }

  const handleOnStudentClick = (student) => {
    setAddedStudents([...addedStudents, student]);
  }
  const renderStudentsAdded = () => {
    return addedStudents.map((student) => {
    return <ListItem dense key={student.email}>
      <ListItemText>{student.email}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={() => {handleStudentRemove((student))}}>
          <CloseIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>;
    });
  }



  return (
    <ThemeProvider theme={formTheme}>
      <form>
        <TextField  label="Add Title" className={classes.textField}/>
        <Divider />
        <Field
          label="Start Date"
          name="startDate"d
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
        className={classes.addStudentsField}
          onOpen={()=> {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          options={(props.students) ? props.students: []}
          onChange={(event, value, reason) => {
            if(reason === "select-option"){
              handleOnStudentClick(value);
            }
          }}
          getOptionSelected={(option,value) => option.email === value.email}
          getOptionLabel={(option) => option.email}
          renderInput={(params) => <TextField {...params} variant="outlined" InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
              {(loading ? <CircularProgress/> : null)}
              {params.InputProps.endAdornment}
              </>
            )
          }}/>}
        />
  <List className={classes.addedStudentsList}>
    {renderStudentsAdded()}
  </List>
        <Divider />
      </form>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students.data,
  }
}

const AddEventFormWithReduxForm = reduxForm({
  form: "AddEventDrawerForm",
  validate: validateDates,
  enableReinitialize: true,
})(AddEventForm);

export default connect(mapStateToProps,{
  getStudents,
})(AddEventFormWithReduxForm);
