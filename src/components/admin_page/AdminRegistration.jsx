import React from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Chip,
  Divider,
} from "@material-ui/core";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CustomTextField from "../custom/CustomTextField";
import FormControl from "@material-ui/core/FormControl";
import AdminDrawer from "./AdminDrawer";
import { Field, reduxForm } from "redux-form";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    backgroundColor: "red",
    color: "white",
  },
  content: {
    height: "100vh",
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(3, 2),
  },
  titlePadding: {
    padding: "10px",
  },
  fieldRegPadding: {
    padding: "100px",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(6, 3),
  },
}));

const AdminRegistration = () => {
  const classes = useStyles();
  const [acctype, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Paper elevation={3} className={classes.titlePadding}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.content}
      >
        <Typography align="center">Registration Page</Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <Field name="name" component={CustomTextField} label="Full Name" />
          <Field name="email" component={CustomTextField} label="Email" />
        </form>
      </Grid>
    </Paper>
  );
};

export default reduxForm({
  form: "AdminRegistration",
})(AdminRegistration);
