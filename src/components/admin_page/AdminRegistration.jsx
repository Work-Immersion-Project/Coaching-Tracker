import React from "react";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles(() => ({
  buttonStyle: {
    backgroundColor: "red",
    color: "white",
  },
  content: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 1em",
    backgroundColor: "#4B4E6D",
  },
  form: {
    backgroundColor: "#222222",
    borderRadius: "1em",
    maxWidth: "600px",
    padding: "1em",
  },
  textField: {
    borderRadius: "10px",
    width: "100%",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    color: "white",
    paddingLeft: "0.5em",
    "& input:error": {
      borderColor: "red",
      borderWidth: 2,
    },
  },
  selectField: {
    borderRadius: "10px",
    color: "white",
    width: "100%",
    border: "2px solid white",
    paddingLeft: "0.5em",
  },
  subjectField: {
    borderRadius: "10px",
    color: "white",
    border: "2px solid white",
    paddingLeft: "0.5em",
  },
  selectValue: {
    color: "black",
  },

  inputLabel: {
    width: "100%",
    color: "white",
    marginTop: "1em",
    marginBottom: "1em",
    textAlign: "start",
  },
  submitButton: {
    backgroundColor: "#84DCC6",
    "&:hover": {
      backgroundColor: "#52aa95",
    },
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
      <Grid item sm>
        <FormControl fullWidth error={errors.course !== undefined}>
          <InputLabel>Course</InputLabel>
          <Controller
            as={Select}
            name="course"
            control={control}
            defaultValue=""
            fullWidth
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
      </Grid>
    );
  };

  const renderForms = () => {
    if (userType === "student") return renderStudentForms();
    return null;
  };

  const validateEmail = () => {
    if (errors.email) {
      if (errors.email.type === "required") {
        console.log("email");
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
      <Grid container className={classes.content} elevation={3}>
        <Grid
          item
          container
          className={classes.form}
          direction="column"
          justify="center"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item sm>
            <TextField
              name="firstName"
              error={errors.firstName !== undefined}
              label="First Name"
              fullWidth
              inputRef={register({
                required: true,
              })}
              helperText={_.isUndefined(errors.firstName) ? "" : "Required"}
            />
          </Grid>
          <Grid item sm>
            <TextField
              name="middleName"
              label="Middle Name"
              fullWidth
              inputRef={register}
            />
          </Grid>
          <Grid item sm>
            <TextField
              error={errors.lastName !== undefined}
              name="lastName"
              label="Last Name"
              fullWidth
              inputRef={register({
                required: true,
              })}
              helperText={_.isUndefined(errors.lastName) ? "" : "Required"}
            />
          </Grid>
          <Grid item sm>
            <TextField
              error={errors.email !== undefined}
              name="email"
              label="Email"
              fullWidth
              inputRef={register({
                required: true,
                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              helperText={validateEmail()}
            />
          </Grid>
          <Grid item sm>
            <TextField
              error={errors.id !== undefined}
              name="id"
              label="ID"
              fullWidth
              inputRef={register({
                required: true,
              })}
              helperText={_.isUndefined(errors.id) ? "" : "Required"}
            />
          </Grid>
          <Grid item sm>
            <FormControl fullWidth error={errors.type !== undefined}>
              <InputLabel>Type</InputLabel>
              <Controller
                as={Select}
                name="type"
                control={control}
                defaultValue=""
                fullWidth
                rules={{ required: true }}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"student"}>Student</MenuItem>
                <MenuItem value={"teacher"}>Teacher</MenuItem>
              </Controller>
              <FormHelperText>
                {_.isUndefined(errors.type) ? "" : "Required"}
              </FormHelperText>
            </FormControl>
          </Grid>
          {renderForms()}
          <Button
            type="submit"
            className={classes.submitButton}
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminRegistration;
