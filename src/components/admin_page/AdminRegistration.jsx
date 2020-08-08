import React, { useState } from "react";
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
import CustomSelectField from "../custom/CustomSelectField";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import {
  showModal,
  hideModal,
  addStudent,
  addTeacher,
  registerUser,
} from "../../actions";
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

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "id",
    "type",
    "subjects",
  ];
  requiredFields.forEach((field) => {
    if (!values[field] && _.isEmpty(values[field])) {
      errors[field] = "Required";
    }
  });

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (values.email && !values.email.includes("@ciit.edu.ph")) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const AdminRegistration = (props) => {
  const classes = useStyles();
  const { reset, pristine, submitting } = props;
  const { register, handleSubmit, control, errors } = useForm();
  const [userType, setUserType] = useState("");
  const handleRegisterUser = (values) => {
    reset();
    const createdAt = new Date();
    props.registerUser({ ...values, createdAt });
  };

  const onSubmit = (values) => {
    console.log(values);
    // props.showModal("CONFIRMATION_MODAL", {
    //   onDialogClose: onDialogClose,
    //   title: "Register User",
    //   content:
    //     "Make sure that you have entered the correct information before proceeding.",
    //   onNegativeClick: onDialogClose,
    //   onPositiveClick: () => handleRegisterUser(values),
    // });
  };

  const onDialogClose = () => {
    props.hideModal();
  };

  const renderStudentForms = () => {
    return (
      <Grid item sm>
        <InputLabel className={classes.inputLabel}>Course</InputLabel>
        <Field
          name="course"
          id="course"
          required
          native
          disableUnderline
          component={CustomSelectField}
          className={classes.selectField}
        >
          <option value={""} />
          <option className={classes.selectValue} value={"bma"}>
            Bachelor of Multiedia Arts
          </option>
          <option className={classes.selectValue} value={"bfa"}>
            Bachelor of Fine Arts
          </option>
          <option className={classes.selectValue} value={"bscs"}>
            Bachelor of Science in Computer Science
          </option>
          <option className={classes.selectValue} value={"bsemc"}>
            Bachelor of Science in Entertainment and Multimedia Computing
          </option>
        </Field>
      </Grid>
    );
  };

  const renderForms = () => {
    if (
      props.formValues &&
      props.formValues.type &&
      props.formValues.type !== ""
    ) {
      const { type } = props.formValues;
      if (type === "student") {
        return renderStudentForms();
      }
    }
    return null;
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
              })}
              helperText={_.isUndefined(errors.email) ? "" : "Required"}
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

const mapStateToProps = (state) => {
  return {
    formValues: state.form.AdminRegistration?.values,
    error: state.errors.errorMessage,
  };
};

const adminRegistrationWithReduxForm = reduxForm({
  form: "AdminRegistration",
  validate,
})(AdminRegistration);

export default connect(mapStateToProps, {
  showModal,
  hideModal,
  addStudent,
  addTeacher,
  registerUser,
})(adminRegistrationWithReduxForm);
