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
import AdminDrawer from "./AdminDrawer";

function createData(studentName, gradeLvl) {
  return { studentName, gradeLvl};
}

const rows = [
  createData("Student", "Grade 11"),
  createData("Student 1", "3rd Year College"),
  createData("Student 2", "2nd Year College"),
  createData("Student 4", "Grade 12"),
  createData("Student 5", "4th Year College"),
];

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    width: "100%",
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
  root: {
    backgroundColor: "#4B4E6D",
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
    <Grid container direction="row">
      <Grid item sm={"auto"}>
        <AdminDrawer />
      </Grid>
      <Grid item sm={"auto"}container className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Paper elevation={3} className={classes.tablePaper}>
            <Typography align="center">Student List</Typography>
            <TableContainer className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center"> Name of Students</StyledTableCell>
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
                        align = "center"
                      >
                        {row.studentName}
                      </StyledTableCell>
                      <StyledTableCell 
                        className={classes.tableCell} 
                        align ="center"
                      >
                          {row.gradeLvl}
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

export default StudentList;