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

function createData(teacher) {
  return { teacher };
}

const rows = [
  createData("Teacher"),
  createData("Teacher1"),
  createData("Teacher2"),
  createData("Teacher3"),
  createData("Teacher4"),
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

const TeacherList = () => {
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
                <StyledTableCell align="center">
                  Name of Teachers
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.teacher}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={classes.tableCell}
                    align="left"
                  >
                    {row.teacher}
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

export default TeacherList;
