import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Card,
  List,
  ListItem,
  ListItemSecondaryAction,
  Divider,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    padding: "1em",
  },
  notificationCard: {
    height: "100%",
    width: "100%",

    backgroundColor: "white",
  },
  content: {
    width: "100%",
  },
}));

const sampleNotif = [
  {
    title:
      "A student has requested a coaching session. Click me for more details.",
  },
  {
    title: "aaaaaaaa",
  },
  {
    title: "aaaaaaaa",
  },
  {
    title: "aaaaaaaa",
  },
  {
    title: "aaaaaaaa",
  },
  {
    title: "aaaaaaaa",
  },
  {
    title: "aaaaaaaa",
  },
  {
    title: "aaaaaaaa",
  },
];

const TeacherNotifications = () => {
  const renderNotification = () => {
    return sampleNotif.map((notif) => {
      return (
        <>
          <ListItem button key={notif.title}>
            <ListItemText>{notif.title}</ListItemText>
          </ListItem>
          <Divider />
        </>
      );
    });
  };

  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignContent="center"
      direction="column"
    >
      <Card elevation={4} className={classes.notificationCard}>
        <Grid className={classes.content} item container direction="column">
          <Grid container justify="flex-end">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <List>{renderNotification()}</List>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default TeacherNotifications;
