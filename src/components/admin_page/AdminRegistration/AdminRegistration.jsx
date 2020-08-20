import React from "react";
import {
  Button,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    width: "100%",
    placeContent: "center",
  },
  buttonStyle: {
    backgroundColor: "red",
    color: "white",
  },
  selectLabel: {
    marginLeft: "1em",
  },
  formWrapper: {
    padding: "2em",
    backgroundColor: "white",
    borderRadius: "30px",
    justifySelf: "center",
    display: "grid",
    gridGap: "1em",
    gridTemplateColumns: "repeat(auto-fit, minmax(800px, 1fr))",
  },
  form: {
    width: "100%",
    display: "grid",
    gridGap: "1em",
    placeItems: "center",
  },
  textField: {
    width: "100%",

    // Text Fields
    "label + &": {
      color: "#4EC8F4",
    },
    "& label.Mui-focused": {
      color: "#4EC8F4",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      "& fieldset": {
        borderColor: "#00364D",
      },
      "&:hover fieldset": {
        borderColor: "#4ec8f4",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4ec8f4",
      },
    },
  },

  selectField: {
    width: "100%",
    // Text Fields
    "& .MuiInputLabel-formControl": {
      transform: "translate(0, 21px) scale(1)",
    },

    "& .MuiSelect-select:focus": {
      borderRadius: "30px",
    },

    "& MuiFormLabel-root": {
      color: "rgba(0, 0, 0, 0.54)",
    },

    "& .MuiInputLabel-shrink ": {
      transform: "translate(-3px, -6px) scale(0.75)",
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      "& fieldset": {
        borderColor: "#00364D",
      },
      "&:hover fieldset": {
        borderColor: "#4ec8f4",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4ec8f4",
      },
    },

    "& .MuiFormLabel-root.Mui-focused": {
      color: "#4ec8f4",
    },
  },

  inputLabel: {
    width: "100%",
    color: "white",
    marginTop: "1em",
    marginBottom: "1em",
    textAlign: "start",
  },
  submitButton: {
    backgroundColor: "#00364D",
    "&:hover": {
      backgroundColor: "#4EC8F4",
    },
    maxWidth: "500px",
    color: "white",
    borderRadius: "30px",
    marginTop: "1em",
    margin: "0 5em",
  },
}));

const AdminRegistration = ({ registerUserRequest, showModal, hideModal }) => {
  const classes = useStyles();
  const { register, handleSubmit, control, errors, reset, watch } = useForm();
  const userType = watch("type");
  const handleRegisterUser = (values) => {
    reset();
    const createdAt = new Date();
    hideModal();
    registerUserRequest({ ...values, createdAt });
  };

  const onSubmit = (values) => {
    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Register User",
      content:
        "Make sure that you have entered the correct information before proceeding.",
      onNegativeClick: onDialogClose,
      onPositiveClick: () => handleRegisterUser(values),
    });
  };

  const onDialogClose = () => {
    hideModal();
  };

  const renderStudentForms = () => {
    return (
      <FormControl
        fullWidth
        error={errors.course !== undefined}
        className={classes.selectField}
      >
        <InputLabel className={classes.selectLabel}>Course</InputLabel>
        <Controller
          as={Select}
          name="course"
          label="Course"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        >
          <MenuItem value={""}></MenuItem>
          <MenuItem value={"BMA"}>Bachelor of Multimedia Arts</MenuItem>
          <MenuItem value={"BFA"}>Bachelor of Fine Arts</MenuItem>
          <MenuItem value={"BSCS"}>
            Bachelor of Science in Computer Science
          </MenuItem>
          <MenuItem value={"BSEMC"}>
            Bachelor of Science in Entertainment and Multimedia Computing
          </MenuItem>
        </Controller>
        <FormHelperText>
          {_.isUndefined(errors.course) ? "" : "Required"}
        </FormHelperText>
      </FormControl>
    );
  };

  const renderForms = () => {
    if (userType === "student") return renderStudentForms();
    return null;
  };

  const validateEmail = () => {
    if (errors.email) {
      if (errors.email.type === "required") {
        return "Required";
      } else if (errors.email.type === "pattern") {
        return "Invalid Email";
      }
    } else {
      return "";
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.formWrapper} elevation={5}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              className={classes.textField}
              name="firstName"
              error={errors.firstName !== undefined}
              label="First Name"
              defaultValue=""
              inputRef={register({
                required: true,
              })}
              helperText={_.isUndefined(errors.firstName) ? "" : "Required"}
            />

            <TextField
              className={classes.textField}
              variant="outlined"
              name="middleName"
              label="Middle Name"
              defaultValue=""
              inputRef={register}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              error={errors.lastName !== undefined}
              name="lastName"
              label="Last Name"
              defaultValue=""
              inputRef={register({
                required: true,
              })}
              helperText={_.isUndefined(errors.lastName) ? "" : "Required"}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              error={errors.email !== undefined}
              name="email"
              label="Email"
              defaultValue=""
              inputRef={register({
                required: true,
                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ciit.edu.ph$/,
              })}
              helperText={validateEmail()}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              error={errors.id !== undefined}
              name="id"
              label="ID"
              defaultValue=""
              inputRef={register({
                required: true,
              })}
              helperText={_.isUndefined(errors.id) ? "" : "Required"}
            />
            <FormControl
              fullWidth
              error={errors.type !== undefined}
              className={classes.selectField}
            >
              <InputLabel className={classes.selectLabel}>Type</InputLabel>
              <Controller
                as={<Select variant="outlined" />}
                name="type"
                label="Type"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              >
                <MenuItem value={"student"}>Student</MenuItem>
                <MenuItem value={"teacher"}>Teacher</MenuItem>
              </Controller>
              <FormHelperText>
                {_.isUndefined(errors.type) ? "" : "Required"}
              </FormHelperText>
            </FormControl>
            {renderForms()}
            <Button
              type="submit"
              className={classes.submitButton}
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default AdminRegistration;
