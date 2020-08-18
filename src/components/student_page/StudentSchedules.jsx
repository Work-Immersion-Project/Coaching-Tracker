import React from "react";
import { connect } from "react-redux";
import {
  Paper,
  CircularProgress,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomSchedulerContainer from "../custom/scheduler/CustomSchedulerContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  scheduler: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: "30px",
    overflow: "hidden",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#222222",
      },
    },

    MuiTypography: {
      h6: {
        color: "white",
      },
    },

    DayScaleEmptyCell: {
      emptyCell: {
        backgroundColor: "#222222",
      },
    },

    MuiTableBody: {
      root: {
        backgroundColor: "#222222",
      },
    },
    TickCell: {
      cell: {
        borderBottom: "1px solid rgba(34, 34, 34, 1)",
      },
    },

    Cell: {
      dayOfWeek: {
        color: "white",
      },
      dayOfMonth: {
        color: "white",
      },
      highlightedText: {
        color: "#84DCC6",
      },
      otherMonth: {
        color: "rgba(244, 244, 244, 0.38)",
      },
      today: {
        color: "#222222",
        background: "#84DCC6",
      },
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
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#84DCC6",
        },
      },
      notchedOutline: {
        borderColor: "#84DCC6",
      },
    },

    MuiTableCell: {
      head: {
        color: "#84DCC6",
      },
      body: {
        color: "white",
      },
    },

    MuiMenuItem: {
      root: {
        color: "#84DCC6",
      },
    },

    MuiSelect: {
      icon: {
        color: "#84DCC6",
      },
    },
  },
});

const StudentSchedules = (props) => {
  const classes = useStyles();
  const renderContent = () => {
    if (props.coachingSchedules) {
      return (
        <ThemeProvider theme={formTheme}>
          <Paper className={classes.scheduler}>
            <CustomSchedulerContainer
              accessType="student"
              className={classes.scheduler}
              calendarEvents={props.coachingSchedules}
            />
          </Paper>
        </ThemeProvider>
      );
    }
    return <CircularProgress />;
  };

  return <div className={classes.root}>{renderContent()}</div>;
};

const mapStateToProps = (state) => {
  return {
    coachingSchedules: state.coaching.coachingSchedules,
  };
};

export default connect(mapStateToProps)(StudentSchedules);
