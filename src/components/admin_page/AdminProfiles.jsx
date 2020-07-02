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

function createData(teacher, student) {
  return { teacher, student};
}

const rows = [
  createData("Teacher", 10,),
  createData("Teacher1", 10,),
  createData("Teacher2", 20),
  createData("Teacher3", 15),
  createData("Teacher4", 6),
];

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    width: "100%",
  },
  table: {
    width: "40vw",
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

const AdminProfiles = () => {
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
            <Typography align="center">Profiles</Typography>
            <TableContainer className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell> Name of Teachers</StyledTableCell>
                    <StyledTableCell align="right">
                      {" "}
                      No. of Students Coached
                    </StyledTableCell>
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

export default AdminProfiles;
