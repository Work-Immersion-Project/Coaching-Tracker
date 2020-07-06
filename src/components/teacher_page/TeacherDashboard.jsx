import React from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TeacherDrawer from "./TeacherDrawer";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#4B4E6D",
  },
}));

const TeacherDash = () => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.content}
      container
      direction="column"
      justify="center"
      alignItems="center"
    ></Grid>
  );
};
