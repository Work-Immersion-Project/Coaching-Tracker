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
    <Grid container direction="row">
      <Grid item sm={2}>
        <AdminDrawer />
      </Grid>
      <Paper elevation={3} className={classes.titlePadding}>
        <Grid item sm={10}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.content}
          >
            <Typography align="center">Registration Page</Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <Field
                name="name"
                component={CustomTextField}
                label="Full Name"
              />
              <Field name="email" component={CustomTextField} label="Email" />
              {/* <TextField id="standard-basic" label="Full Name" />
              <TextField id="standard-basic" label="Email Address" /> */}
              {/* <div classname={classes.section2}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Account Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={acctype}
                    onChange={handleChange}
                    label="Account Type"
                  >
                    <MenuItem value="none">
                      <em>None</em>{" "}
                    </MenuItem>
                    <MenuItem value="teacher"> Teacher </MenuItem>
                    <MenuItem value="student"> Student </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div class="wrapper">
                <div classname={classes.section1}>
                  <Button variant="contained">Submit</Button>
                </div>
              </div> */}
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default reduxForm({
  form: "AdminRegistration",
})(AdminRegistration);
