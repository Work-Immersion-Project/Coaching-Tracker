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
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TeacherDrawer from "./TeacherDrawer";

function createData(studentFirstName, studentLastName, gradeLvl) {
  return { studentFirstName, studentLastName, gradeLvl };
}

const rows = [
  createData("Juan", "Luna", "1st Year College"),
  createData("John", "Doe", "3rd Year College"),
  createData("John", "Dig", "2nd Year College"),
  createData("John", "Mike", "Grade 12"),
  createData("John", "Last", "4th Year College"),
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

const StudentList = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.content}
    >
      <Paper elevation={3} className={classes.tablePaper}>
        <TableContainer className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"> First Name</StyledTableCell>
                <StyledTableCell align="center"> Last Name </StyledTableCell>
                <StyledTableCell align="center"> Grade Level </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.teacher}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={classes.tableCell}
                    align="center"
                  >
                    {row.studentName}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell} align="center">
                    {row.gradeLvl}
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

export default StudentList;
