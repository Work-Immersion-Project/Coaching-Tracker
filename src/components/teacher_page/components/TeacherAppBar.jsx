import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { openDrawer, closeDrawer } from "../../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "white",
  },
}));

const TeacherAppBar = (props) => {
  const [title, setTitle] = useState("Admin");
  const classes = useStyles();

  const onMenuButtonClick = () => {
    if (props.isDrawerOpen) {
      props.closeDrawer();
    } else {
      props.openDrawer();
    }
  };

  useEffect(() => {
    const formattedPath = props.location.pathname.replace("/teacher", "");
    switch (formattedPath) {
      case "/":
        setTitle("Home");
        break;
      case "/student-list":
        setTitle("Student List");
        break;
      case "/schedules":
        setTitle("Schedules");
        break;

      default:
        setTitle("Teacher");
        break;
    }
  }, [props.location.pathname]);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} onClick={onMenuButtonClick}>
          <MenuIcon />
        </IconButton>
        <Typography>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpen: state.isDrawerOpen,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    openDrawer,
    closeDrawer,
  })(TeacherAppBar)
);
