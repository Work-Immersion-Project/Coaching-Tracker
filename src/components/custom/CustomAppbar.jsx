import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Popover,
  Badge,
  ListItem,
  ListItemText,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { openDrawer, closeDrawer } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FixedSizeList } from "react-window";
import moment from "moment";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "#84DCC6",
  },
  notificationButton: {
    marginRight: theme.spacing(2),
    color: "#84DCC6",
  },
  appBar: {
    background: "#333333",
  },
  notificationPaper: {
    background: "#333333",
    color: "#84DCC6",
  },
  title: {
    flexGrow: 1,
  },
}));

const CustomAppbar = (props) => {
  const [title, setTitle] = useState("Admin");
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const classes = useStyles();

  const onMenuButtonClick = () => {
    if (props.isDrawerOpen) {
      props.closeDrawer();
    } else {
      props.openDrawer();
    }
  };

  const onNotifOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onNotifClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    moment.updateLocale("en", {
      relativeTime: {
        ss: "%d secs",
        m: "a minute",
        mm: "%d mins",
      },
    });

    const splittedPath = props.location.pathname.split("/");
    const formattedPath = splittedPath[splittedPath.length - 1];

    let appbarTitle = "";

    if (
      formattedPath !== "" &&
      formattedPath !== "teacher" &&
      formattedPath !== "admin" &&
      formattedPath !== "student"
    ) {
      if (formattedPath.includes("-")) {
        appbarTitle = _.reduce(formattedPath.split("-"), (current, next) => {
          return (
            _.startCase(_.toLower(current)) + " " + _.startCase(_.toLower(next))
          );
        });
      } else {
        appbarTitle = _.startCase(_.toLower(formattedPath));
      }
    } else {
      appbarTitle = "Dashboard";
    }
    setTitle(appbarTitle);
  }, [props.location.pathname]);

  const renderNotifications = () => {
    if (props.unseenNotif.length === 0) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Typography>No Notifications</Typography>
        </Grid>
      );
    }

    return props.unseenNotif.map((notif) => {
      return (
        <ListItem key={notif.notificationId}>
          <ListItemText primary={notif.message} />
          <ListItemText primary={moment().fromNow()} />
        </ListItem>
      );
    });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            onClick={onMenuButtonClick}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title}>{title}</Typography>
          <IconButton
            className={classes.notificationButton}
            onClick={onNotifOpen}
          >
            <Badge badgeContent={props.unseenNotif.length}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            open={isOpen}
            anchorEl={anchorEl}
            onClose={onNotifClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <FixedSizeList
              height={300}
              width={500}
              className={classes.notificationPaper}
              itemSize={20}
              itemCount={props.unseenNotif.length}
            >
              {renderNotifications}
            </FixedSizeList>
          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpen: state.isDrawerOpen,
    unseenNotif: state.notifications.data.filter((notif) => !notif.seen),
  };
};

export default withRouter(
  connect(mapStateToProps, {
    openDrawer,
    closeDrawer,
  })(CustomAppbar)
);
