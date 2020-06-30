import React from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import AdminDrawer from "./AdminDrawer";

function createData(teacher, student, time_in, time_out) {
  return { teacher, student, time_in, time_out };
}

const rows = [
  createData("Teacher", 10, "8:00 AM", "6:00 PM"),
  createData("Teacher1", 10, "9:00 AM", "6:00 PM"),
  createData("Teacher2", 20, "8:00 AM", "6:00 PM"),
  createData("Teacher3", 15, "8:00 AM", "6:00 PM"),
  createData("Teacher4", 6, "8:00 AM", "6:00 PM"),
];

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    width: "100%",
  },
  table: {
    width: "60vw",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const AdminCoachingLog = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item xs={2}>
        <AdminDrawer />
      </Grid>
      <Grid item xs={10}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Paper elevation={3}>
            <Typography align="center">Coaching Logs</Typography>
            <TableContainer className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell> Teacher</StyledTableCell>
                    <StyledTableCell align="right">
                      {" "}
                      Students Coached
                    </StyledTableCell>
                    <StyledTableCell align="right"> Time In</StyledTableCell>
                    <StyledTableCell align="right"> Time Out</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.teacher}>
                      <StyledTableCell component="th" scope="row">
                        {row.teacher}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.student}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.time_in}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {" "}
                        {row.time_out}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminCoachingLog;
