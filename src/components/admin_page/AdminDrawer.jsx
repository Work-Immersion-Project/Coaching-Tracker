import React, { useState } from "react";
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
import history from "../../history";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    height: "100%",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#222222",
    color: "white",
    height: "100%",
  },

  imageContainer: {
    height: "100px",
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
  image: {
    width: "80%",
  },

  active: {
    width: "100%",
    margin: "0.3em 0",
    backgroundSize: "200% 300%",
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(255,255,255,1) 50%)",
    transition: "all 1s ease",

    borderRadius: "30px 0 0 30px",
    backgroundPosition: "right bottom",
    color: "#00364D !important",

    "& $icon": {
      color: "#00364D",
    },
  },
  icon: {
    color: "white",
  },
  inActive: {
    margin: "0.3em 0",
    backgroundSize: "200% 300%",
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(255,255,255,1) 50%)",
    transition: "all 1s ease",

    "&:hover": {
      color: "#00364D",
      backgroundPosition: "right bottom",
      "& $icon": {
        color: "#00364D",
      },
    },
    borderRadius: "30px 0 0 30px",
  },
}));

const AdminDrawer = (props) => {
  const [selectedPath, setSelectedPath] = useState(history.location.pathname);
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
      const pathname = `/Coaching-Tracker/admin${path}`;
      const formattedSelectedPath = selectedPath.endsWith("admin")
        ? `${selectedPath}/`
        : selectedPath;

      const isActive = formattedSelectedPath === pathname;
      return (
        <div
          className={isActive ? classes.active : classes.inActive}
          key={text}
        >
          <ListItem
            button
            component={Link}
            to={{
              pathname: `/Coaching-Tracker/admin${path}`,
              state: { text: text },
            }}
            key={text}
            onClick={() => setSelectedPath(pathname)}
          >
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </div>
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
          <div className={classes.imageContainer}>
            <img
              alt="CIIT LOGO"
              className={classes.image}
              src={process.env.PUBLIC_URL + "/ciit_logo.png"}
            />
          </div>
          <div> {renderListItems()}</div>
          <ListItem
            className={classes.inActive}
            button
            onClick={handleSignoutButton}
          >
            <ListItemIcon>
              <ExitToAppIcon className={classes.icon} />
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
          <div className={classes.imageContainer}>
            <img
              alt="CIIT LOGO"
              className={classes.image}
              src={process.env.PUBLIC_URL + "/ciit_logo.png"}
            />
          </div>
          <div> {renderListItems()}</div>
          <ListItem
            className={classes.inActive}
            button
            onClick={handleSignoutButton}
          >
            <ListItemIcon>
              <ExitToAppIcon className={classes.icon} />
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
