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
import { connect } from "react-redux";
import { showModal, hideModal } from "../../actions";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",

    padding: "1em",
  },
  notificationCard: {
    height: "100%",
    width: "100%",
  },
  content: {
    width: "100%",
  },
}));

const TeacherNotifications = (props) => {
  const onDialogClose = () => {
    props.hideModal();
  };

  const onNotificationClick = (coachingSessionId) => {
    props.showModal("COACHING_SESSION_MODAL", {
      onDialogClose: onDialogClose,
      coachingSessionId,
    });
  };

  const renderNotification = () => {
    return props.notifications.map((notif) => {
      return (
        <>
          <ListItem
            button
            onClickCapture={() => {
              onNotificationClick(notif.coachingSessionId);
            }}
            key={notif.coachingSessionId}
          >
            <ListItemText>{notif.message}</ListItemText>
          </ListItem>
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

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.data,
  };
};

export default connect(mapStateToProps, {
  showModal,
  hideModal,
})(TeacherNotifications);
