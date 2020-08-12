import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from "@material-ui/core";
import {
  signOutRequest,
  showModal,
  hideModal,
  closeDrawer,
} from "../../actions";
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
    backgroundColor: "#222222",
    color: "white",
  },
  iconColor: {
    color: "#84DCC6",
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
      text: "Manage Subjects",
      icon: <SchoolIcon />,
      path: "/manage-subjects",
    },

    {
      text: "Coaching Log",
      icon: <AssignmentIndIcon />,
      path: "/coaching-log",
    },
    {
      text: "Manage Teachers",
      icon: <FaceIcon />,
      path: "/manage-teachers",
    },
    {
      text: "Manage Students",
      icon: <SchoolIcon />,
      path: "/manage-students",
    },
  ];

  const renderListItems = () => {
    return drawerItems.map((item) => {
      const { path, text, icon } = item;
      return (
        <ListItem
          button
          component={Link}
          to={{
            pathname: `/Coaching-Tracker/admin${path}`,
            state: { text: text },
          }}
          key={text}
        >
          <ListItemIcon className={classes.iconColor}>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      );
    });
  };

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
  signOutRequest,
  showModal,
  hideModal,
})(AdminDrawer);
