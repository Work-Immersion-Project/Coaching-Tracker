import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Lens from "@material-ui/icons/Lens";
import _ from "lodash";
import moment from "moment";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1em",
  },
  notificationCard: {
    height: "100%",
    width: "100%",
    backgroundColor: "#222222",
  },
  emptyContent: {
    width: "100%",
    height: "100%",
    color: "#84DCC6",
  },
  content: {
    width: "100%",
    padding: "2em",
    color: "#84DCC6",
  },
  unseenIndicator: {
    color: "#4B4E6D",
  },
  divider: {
    height: "0.1px",
    backgroundColor: "#95a3b3",
  },
  deleteIcon: {
    color: "#84DCC6",
  },
  notifMessage: {
    padding: "0.5em 0.5em",
  },
}));

const NotificationPage = ({
  hideModal,
  showModal,
  notifications,
  updateNotification,
}) => {
  const onDialogClose = () => {
    hideModal();
  };

  useEffect(() => {
    moment.updateLocale("en", {
      relativeTime: {
        ss: "%d secs",
        m: "a minute",
        mm: "%d mins",
      },
    });
  }, []);
  const onNotificationClick = ({
    payload: { coachingSessionID },
    ID,
    seen,
  }) => {
    if (!seen) {
      updateNotification(ID);
    }
    showModal("COACHING_SESSION_MODAL", {
      onDialogClose: onDialogClose,
      selectedCoachingSessionID: coachingSessionID,
    });
  };

  const renderContent = () => {
    if (_.isEmpty(notifications)) {
      return (
        <Grid
          className={classes.emptyContent}
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography>You currently have no notifications.</Typography>
        </Grid>
      );
    }

    return (
      <Grid className={classes.content} item container direction="column">
        <Grid container justify="flex-end">
          <IconButton>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          <List>{renderNotification()}</List>
        </Grid>
      </Grid>
    );
  };

  const renderNotification = () => {
    return notifications.map((notif) => {
      return (
        <div key={notif.ID}>
          <ListItem
            button
            alignItems="flex-start"
            onClickCapture={() => {
              onNotificationClick(notif);
            }}
          >
            {notif.seen ? null : (
              <ListItemIcon>
                <Lens className={classes.unseenIndicator} />
              </ListItemIcon>
            )}

            <ListItemText className={classes.notifMessage} key={notif.ID}>
              {notif.message}
            </ListItemText>
            <ListItemSecondaryAction>
              <Typography variant="caption">
                {notif.CreatedAt ? moment(notif.CreatedAt).fromNow() : ""}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider className={classes.divider} component="li" />
        </div>
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
        {renderContent()}
      </Card>
    </Grid>
  );
};

export default NotificationPage;
