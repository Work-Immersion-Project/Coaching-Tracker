import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Button,
} from "@material-ui/core";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SchoolIcon from "@material-ui/icons/School";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
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
    backgroundColor: "#95A3B3",
    color: "white",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const TeacherDrawer = (props) => {
  const classes = useStyles();
  const drawerItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Student List",
      icon: <SchoolIcon />,
      path: "/student-list",
    },
    {
      text: "Schedules",
      icon: <CalendarTodayIcon />,
      path: "/schedules",
    },
  ];
  const onDialogClose = () => {
    props.hideModal();
  };

  const handleSignoutButton = () => {
    props.showModal("SIGN_OUT_CONFIRMATION_MODAL", {
      onClose: onDialogClose,
      title: "Sign Out",
      content: "Are you sure you want to sign out?",
      actions: (
        <>
          <Button onClick={onDialogClose}>Cancel</Button>
          <Button
            onClick={() => {
              props.signOut();

              onDialogClose();
            }}
          >
            Confirm
          </Button>
        </>
      ),
    });
  };
  const renderListItems = () => {
    return drawerItems.map((item) => {
      const { path, text, icon } = item;
      return (
        <ListItem
          button
          component={Link}
          to={{ pathname: `/teacher${path}`, state: { text: text } }}
          key={text}
        >
          <ListItemIcon>{icon}</ListItemIcon>
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
          onClose={closeDrawer}
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.toolbar} />
          {renderListItems()}
          <ListItem button onClick={handleSignoutButton}>
            <ListItemIcon>
              <ExitToAppIcon />
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
              <ExitToAppIcon />
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
})(TeacherDrawer);
