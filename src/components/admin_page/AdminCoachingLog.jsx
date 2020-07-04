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
import AdminDrawer from "./AdminDrawer";

function createData(teacher, student, date, time_in, time_out) {
  return { teacher, student, date, time_in, time_out };
}

const rows = [
  createData("Teacher", 10, "5/5/2020", "8:00 AM", "6:00 PM"),
  ,
  createData("Teacher1", 10, "5/5/2020", "9:00 AM", "6:00 PM"),
  createData("Teacher2", 20, "5/5/2020", "8:00 AM", "6:00 PM"),
  createData("Teacher3", 15, "5/5/2020", "8:00 AM", "6:00 PM"),
  createData("Teacher4", 6, "5/5/2020", "8:00 AM", "6:00 PM"),
];

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#4B4E6D",
  },
  table: {
    width: "60vw",
    backgroundColor: "#222222",
    color: theme.palette.common.white,
  },
  tableCell: {
    color: "white",
  },
  tablePaper: {
    backgroundColor: "#95A3B3",
    color: "white",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#84DCC6",
    color: theme.palette.common.black,
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
    <Grid
      className={classes.content}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.tablePaper} elevation={3}>
        <Typography align="center">Coaching Logs</Typography>
        <TableContainer className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell> Teacher</StyledTableCell>
                <StyledTableCell align="right">
                  Students Coached
                </StyledTableCell>
                <StyledTableCell align="right"> Date</StyledTableCell>
                <StyledTableCell align="right"> Time In</StyledTableCell>
                <StyledTableCell align="right"> Time Out</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.teacher}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={classes.tableCell}
                  >
                    {row.teacher}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.tableCell}>
                    {row.student}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.tableCell}>
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.tableCell}>
                    {row.time_in}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.tableCell}>
                    {row.time_out}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default AdminCoachingLog;
