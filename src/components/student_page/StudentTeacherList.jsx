import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Grid,
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
import { getTeachers } from "../../actions";

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

const StudentTeacherList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getTeachers();
  }, [props]);

  const renderContent = () => {
    if (props.teachers) {
      const teachers = Object.values(props.teachers);
      return (
        <Paper elevation={3} className={classes.tablePaper}>
          <TableContainer className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Name of Teachers
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher) => {
                  console.log(teacher);
                  return (
                    <StyledTableRow key={teacher.email}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                        align="left"
                      >
                        {teacher.name}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
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
    teachers: state.teachers?.data,
  };
};

export default connect(mapStateToProps, {
  getTeachers,
})(StudentTeacherList);
