import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#4B4E6D",
  },
  login_wrapper: {
    maxWidth: "500px",
    backgroundColor: "#222222",
  },
  header: {
    color: "white",
  },
});

export default function LoginPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Card align="center" className={classes.login_wrapper}>
          <CardContent>
            <Typography className={classes.header} align="center">
              Login
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
