import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#4B4E6D",
  },
  content2: {
    height: "90vh",
    width: "50%",
  },
  colorCard: {
    height: "10em",
    width: "20em",
    backgroundColor: "#84DCC6",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const AdminDashboard = (props) => {
  const {
    user: {
      metadata: { fName, lName, mName },
    },
  } = props;

  const classes = useStyles();
  return (
    <Grid
      className={classes.content}
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid
        className={classes.content2}
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid>
          <Card className={classes.colorCard}>
            <CardContent>
              <Typography align="center" variant="h3">
                02
              </Typography>
              <Typography align="center" variant="h5">
                Students Coached
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card className={classes.colorCard}>
            <CardContent>
              <Typography align="center" variant="h3">
                01
              </Typography>
              <Typography align="center" variant="h5">
                Cancelled Sessions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        className={classes.content2}
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid>
          <Card className={classes.colorCard}>
            <CardContent>
              <Typography align="center" variant="h3">
                01
              </Typography>
              <Typography align="center" variant="h5">
                Pending Sessions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card className={classes.colorCard}>
            <CardContent>
              <Typography align="center" variant="h4">
                {`${fName} ${mName} ${lName}`}
              </Typography>
              <Typography align="center" variant="h5">
                Admin Name
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.data.user,
  };
};

export default connect(mapStateToProps)(AdminDashboard);