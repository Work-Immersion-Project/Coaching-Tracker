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
import { signOut, showModal, hideModal, closeDrawer } from "../../actions";
import { connect } from "react-redux";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

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

const AdminDrawer = (props) => {
  const classes = useStyles();

  const drawerItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Registration",
      icon: <HowToRegIcon />,
      path: "/registration",
    },
    {
      text: "Coaching Log",
      icon: <AssignmentIndIcon />,
      path: "/coaching-log",
    },
    {
      text: "Teacher List",
      icon: <FaceIcon />,
      path: "/teacher-list",
    },
    {
      text: "Student List",
      icon: <SchoolIcon />,
      path: "/student-list",
    },
  ];

  const renderListItems = () => {
    return drawerItems.map((item) => {
      const { path, text, icon } = item;
      return (
        <ListItem
          button
          component={Link}
          to={{ pathname: `/admin${path}`, state: { text: text } }}
          key={text}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      );
    });
  };

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
              props.gapiAuth.signOut();
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
          <ListItem button>
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
    isDrawerOpen: state.isDrawerOpen,
    gapiAuth: state.gapi.gapiAuth,
  };
};

export default connect(mapStateToProps, {
  closeDrawer,
  signOut,
  showModal,
  hideModal,
})(AdminDrawer);
