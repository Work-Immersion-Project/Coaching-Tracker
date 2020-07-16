import React, { useEffect } from "react";
import { getCoachingSchedules } from "../../actions";
import { connect } from "react-redux";
import { Grid, Paper, CircularProgress, createMuiTheme, ThemeProvider, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomScheduler from "../custom/CustomScheduler";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100%",
    width: "100%",
    padding: "1em",
    overflow: "hidden",
    backgroundColor: "#4B4E6D",
  },
  scheduler: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#222222"
      }
    },
    DayScaleEmptyCell: {
      emptyCell: {
        backgroundColor: "#222222"
      }
    },
    
    MuiTableBody: {
      root: {
        backgroundColor: "#222222"
      }
    },
    TickCell: {
      cell: {
        borderBottom: "1px solid rgba(34, 34, 34, 1)",
      }
    },

    Cell: {
      dayOfWeek: {
        color: "white"
      },
      dayOfMonth: {
        color: "white"
      },
      highlightedText: {
        color: "#84DCC6"
      }
    },

    MuiIconButton: {
      root: {
        color: "#84DCC6",
      },
    },

    MuiButton: {
      root: {
        backgroundColor: "#84DCC6",
        "&:hover": {
          backgroundColor: "#52aa95",
          "@media (hover: none)": {
            backgroundColor: "#84DCC6",
          },
        },
      },
      text: {
        color: "#000000",
      },
    },
    MuiInputBase: {
      root: {
        color: "#84DCC6",
      },
    },

    Label: {
      text: {
        color: "white",
      },
    },

    MuiOutlinedInput: {
      root: {
        "&$focused $notchedOutline": {
          borderColor: "#84DCC6",
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline':{
          borderColor: "#84DCC6",
        }
      },
      notchedOutline: {
        borderColor: "#84DCC6",
      },
    },

  }
});

const TeacherSchedules = (props) => {
  const classes = useStyles();

  const renderContent = () => {
    if (props.coachingSchedules) {
      return (
        <ThemeProvider theme={formTheme}>
        <Paper className={classes.scheduler}>
          <CustomScheduler        
            accessType="teacher"
            className={classes.scheduler}
            calendarEvents={props.calendarEvents}
          />
        </Paper>
        </ThemeProvider>
      );
    }
    return <CircularProgress />;
  };

  return (
    <Grid
      className={classes.content}
      container
      justify="center"
      alignItems="center"
    >
      {renderContent()}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    coachingSchedules: state.coaching.coachingSchedules,
  };
};

export default connect(mapStateToProps, {
  getCoachingSchedules,
})(TeacherSchedules);
