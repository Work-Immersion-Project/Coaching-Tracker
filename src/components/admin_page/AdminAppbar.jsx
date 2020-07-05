import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { openDrawer, closeDrawer } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "white",
  },
}));

const AdminAppBar = (props) => {
  const classes = useStyles();
  const { state } = props.location;
  const onMenuButtonClick = () => {
    if (props.isDrawerOpen) {
      props.closeDrawer();
    } else {
      props.openDrawer();
    }
  };

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton className={classes.menuButton} onClick={onMenuButtonClick}>
          <MenuIcon />
        </IconButton>
        <Typography>{state.text}</Typography>
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
  })(AdminAppBar)
);
