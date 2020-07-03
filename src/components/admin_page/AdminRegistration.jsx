import React from "react";
import { Button, TextField, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import AdminDrawer from "./AdminDrawer";

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
    marginTop: theme.spacing(2),
  },
  titlePadding: {
    padding: "10px",
  },
  fieldRegPadding: {
    padding: "100px",
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
      <Grid item sm={10}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Paper elevation={3} className={classes.titlePadding}>
            <Typography align="center">Registration Page</Typography>
          </Paper>

          <Paper elevation={3} className={classes.fieldRegPadding}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label="Full Name" />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label="Email Address" />
            </form>

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

            <Button variant="contained">Submit</Button>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminRegistration;
