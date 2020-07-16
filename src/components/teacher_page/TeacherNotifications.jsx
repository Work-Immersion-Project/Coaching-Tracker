import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, Grid} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        height: "100%",
        width: "100%",
    }
}))

const TeacherNotifications = () => {
    const classes = useStyles();
    
    return <Grid className={classes.root} container justify="center" alignContent="center" direction="center">
        Notification
    </Grid>
}

export default TeacherNotifications;