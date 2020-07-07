import React, { useEffect } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { getStudents } from "../../actions";
import { connect } from "react-redux";
import AdminDrawer from "./AdminDrawer";

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

const StudentList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getStudents();
  });

  const renderContent = () => {
    if (props.students) {
      const students = Object.values(props.students);
      return (
        <Paper elevation={3} className={classes.tablePaper}>
          <TableContainer className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Name of Students
                  </StyledTableCell>
                  <StyledTableCell align="center">Grade Level</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <StyledTableRow key={student.email}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className={classes.tableCell}
                      align="center"
                    >
                      {student.name}
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tableCell}
                      align="center"
                    >
                      12
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      );
    }
    return <CircularProgress />;
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.content}
    >
      {renderContent()}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students?.data,
  };
};

export default connect(mapStateToProps, {
  getStudents,
})(StudentList);
