import React from "react";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  InputBase,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomTextField from "../custom/CustomTextField";
import CustomSelectField from "../custom/CustomSelectField";
import { connect } from "react-redux";
import { Field, reduxForm, FieldArray } from "redux-form";
import _ from "lodash";
import {
  addUser,
  showModal,
  hideModal,
  addStudent,
  addTeacher,
} from "../../actions";
import CustomAutoComplete from "../custom/CustomAutocomplete";

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
  const { handleSubmit, reset, pristine, submitting } = props;

  const sampleOptions = [
    { title: "abc" },
    { title: "def" },
    { title: "ghi" },
    { title: "jkl" },
  ];

  const registerUser = (values) => {
    reset();
    const createdAt = new Date();
    props.addUser(values);
    if (values.type === "student") {
      props.addStudent({ ...values, createdAt });
    } else if (values.type === "teacher") {
      props.addTeacher({ ...values, createdAt });
    }
  };

  const onSubmit = (values) => {
    props.showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Register User",
      content:
        "Make sure that you have entered the correct information before proceeding.",
      onNegativeClick: onDialogClose,
      onPositiveClick: () => registerUser(values),
    });
  };

  const onDialogClose = () => {
    props.hideModal();
  };

  const renderTeacherForms = () => {
    return (
      <Grid item sm>
        <InputLabel className={classes.inputLabel}>Subject</InputLabel>
        <Field
          name="subject"
          id="subject"
          required
          native
          disableUnderline
          component={CustomSelectField}
          className={classes.selectField}
        >
          <option value={""} />
          <option className={classes.selectValue} value={"subject1"}>
            Subject1
          </option>
        </Field>
      </Grid>
    );
  };

  const renderStudentForms = () => {
    return (
      <Grid item sm>
        <InputLabel className={classes.inputLabel}>Course</InputLabel>
        <Field
          name="subject"
          id="subject"
          required
          native
          disableUnderline
          component={CustomSelectField}
          className={classes.selectField}
        >
          <option value={""} />
          <option className={classes.selectValue} value={"subject1"}>
            Subject1
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
      } else if (type === "teacher") {
        return renderTeacherForms();
      }
    }
    return null;
  };

  const renderSubjectChips = (fields) => {
    const values = fields.getAll();
    if (values) {
      return values.map((subject, index) => {
        return (
          <Chip
            key={subject.title}
            label={subject.title}
            onDelete={() => fields.remove(index)}
          />
        );
      });
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
          <Grid item sm>
            <InputLabel className={classes.inputLabel}>Subjects</InputLabel>
            <FieldArray
              name="subjects"
              renderValues={renderSubjectChips}
              getOptionLabel={(option) => option.title}
              component={CustomAutoComplete}
              variant="outlined"
              clearOnBlur
              inputComponent={InputBase}
              options={sampleOptions}
              className={classes.subjectField}
            />
          </Grid>
          {renderForms()}
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
    formValues: state.form.AdminRegistration?.values,
  };
};

const adminRegistrationWithReduxForm = reduxForm({
  form: "AdminRegistration",
  validate,
})(AdminRegistration);

export default connect(mapStateToProps, {
  addUser,
  showModal,
  hideModal,
  addStudent,
  addTeacher,
})(adminRegistrationWithReduxForm);
