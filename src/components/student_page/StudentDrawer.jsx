import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from "@material-ui/core";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut, showModal, hideModal, closeDrawer } from "../../actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#222222",
    color: "white",
  },
  iconColor: {
    color: "#84DCC6",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const StudentDrawer = (props) => {
  const classes = useStyles();
  const drawerItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Schedules",
      icon: <CalendarTodayIcon />,
      path: "/schedules",
    },
    {
      text: "Notifications",
      icon: <NotificationsIcon />,
      path: "/notifications",
    },
  ];
  const onDialogClose = () => {
    props.hideModal();
  };

  const handleSignoutButton = () => {
    props.showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Sign Out",
      content: "Are you sure you want to sign out?",
      onNegativeClick: onDialogClose,
      onPositiveClick: () => {
        props.signOut();
        onDialogClose();
      },
    });
  };
  const renderListItems = () => {
    return drawerItems.map((item) => {
      const { path, text, icon } = item;
      return (
        <ListItem
          button
          component={Link}
          to={{ pathname: `/student${path}`, state: { text: text } }}
          key={text}
        >
          <ListItemIcon className={classes.iconColor}>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      );
    });
  };

  return (
    <>
      <Hidden smUp>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={props.isDrawerOpen}
          onClose={props.closeDrawer}
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.toolbar} />
          {renderListItems()}
          <ListItem button onClick={handleSignoutButton}>
            <ListItemIcon>
              <ExitToAppIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          {renderListItems()}
          <ListItem button onClick={handleSignoutButton}>
            <ListItemIcon>
              <ExitToAppIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </Drawer>
      </Hidden>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpen: state.drawer.navigationDrawer.isOpen,
  };
};

export default connect(mapStateToProps, {
  closeDrawer,
  signOut,
  showModal,
  hideModal,
})(StudentDrawer);
