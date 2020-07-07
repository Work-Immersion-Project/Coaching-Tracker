import React, { useState } from "react";
import {
  Button,
  Grid,
  InputLabel,
  Modal,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomTextField from "../custom/CustomTextField";
import CustomSelectField from "../custom/CustomSelectField";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { addUser, showModal, hideModal } from "../../actions";
import CustomAlertDialog from "../custom/CustomAlertDialog";

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
    marginTop: "1em",
    margin: "0 5em",
  },
}));

const validate = (values) => {
  const errors = {};
  const requiredFields = ["firstName", "lastName", "email", "id", "type"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
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
  const { handleSubmit, reset, pristine, submitting } = props;

  const registerUser = (values) => {
    const { id, email, firstName, middleName, lastName, type } = values;
    reset();
    props.hideModal();
    props.showModal("LOADING_MODAL", {
      onClose: onDialogClose,
    });

    if (middleName) {
      props.addUser(id, email, `${firstName} ${middleName} ${lastName}`, type);
    } else {
      props.addUser(id, email, `${firstName} ${lastName}`, type);
    }
  };

  const onSubmit = (values) => {
    props.showModal("CONFIRMATION_MODAL", {
      onClose: onDialogClose,
      title: "Register User",
      content:
        "Make sure that you have entered the correct information before proceeding.",
      actions: (
        <>
          <Button onClick={onDialogClose}>Cancel</Button>
          <Button
            onClick={() => {
              registerUser(values);
            }}
          >
            Register
          </Button>
        </>
      ),
    });
  };

  const onDialogClose = () => {
    props.hideModal();
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
            <InputLabel className={classes.inputLabel}>First Name</InputLabel>
            <Field
              className={classes.textField}
              name="firstName"
              id="firstName"
              required
              component={CustomTextField}
            />
          </Grid>
          <Grid item sm>
            <InputLabel className={classes.inputLabel}>Middle Name</InputLabel>
            <Field
              className={classes.textField}
              name="middleName"
              id="middleName"
              component={CustomTextField}
            />
          </Grid>
          <Grid item sm>
            <InputLabel className={classes.inputLabel}>Last Name</InputLabel>
            <Field
              className={classes.textField}
              name="lastName"
              id="lastName"
              required
              component={CustomTextField}
            />
          </Grid>
          <Grid item sm>
            <InputLabel className={classes.inputLabel}>Email</InputLabel>
            <Field
              className={classes.textField}
              name="email"
              id="email"
              required
              component={CustomTextField}
            />
          </Grid>
          <Grid item sm>
            <InputLabel className={classes.inputLabel}>ID</InputLabel>
            <Field
              className={classes.textField}
              name="id"
              id="id"
              required
              component={CustomTextField}
            />
          </Grid>
          <Grid item sm>
            <InputLabel className={classes.inputLabel}>Type</InputLabel>
            <Field
              name="type"
              id="type"
              required
              native
              disableUnderline
              component={CustomSelectField}
              className={classes.selectField}
            >
              <option value={""} />
              <option className={classes.selectValue} value={"teacher"}>
                Teacher
              </option>
              <option className={classes.selectValue} value={"student"}>
                Student
              </option>
            </Field>
          </Grid>
          <Button
            type="submit"
            className={classes.submitButton}
            variant="contained"
            disabled={pristine || submitting}
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
    user: state.users.data,
  };
};

const adminRegistrationWithReduxForm = reduxForm({
  form: "AdminRegistration",
  validate,
})(AdminRegistration);

export default connect(mapStateToProps, { addUser, showModal, hideModal })(
  adminRegistrationWithReduxForm
);
