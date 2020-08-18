import React from "react";
import {
  Paper,
  CircularProgress,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomSchedulerContainer from "../../custom/scheduler/CustomSchedulerContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeContent: "center",
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
    backgroundColor: "#222222",
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

    MuiPopover: {
      paper: {
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
        color: "#4EC8F4",
      },
      otherMonth: {
        color: "rgba(244, 244, 244, 0.38)",
      },
      today: {
        color: "#222222",
        background: "#4EC8F4",
      },
    },

    MuiIconButton: {
      root: {
        color: "#4EC8F4",
      },
    },

    MuiButton: {
      root: {
        backgroundColor: "#4EC8F4",
        "&:hover": {
          backgroundColor: "#0097c1",
          "@media (hover: none)": {
            backgroundColor: "#4EC8F4",
          },
        },
      },
      text: {
        color: "#000000",
      },
    },
    MuiInputBase: {
      root: {
        color: "#4EC8F4",
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
          borderColor: "#4EC8F4",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#4EC8F4",
        },
      },
      notchedOutline: {
        borderColor: "#4EC8F4",
      },
    },

    MuiTableCell: {
      head: {
        color: "#4EC8F4",
      },
      body: {
        color: "white",
      },
    },

    MuiMenuItem: {
      root: {
        color: "#4EC8F4",
      },
    },
    MuiSelect: {
      icon: {
        color: "#4EC8F4",
      },
    },
  },
});

const TeacherSchedules = ({ isLoading, coachingSessions }) => {
  const classes = useStyles();

  const renderContent = () => {
    if (isLoading !== null && !isLoading) {
      return (
        <ThemeProvider theme={formTheme}>
          <Paper className={classes.scheduler}>
            <CustomSchedulerContainer
              accessType="teacher"
              className={classes.scheduler}
              coachingSessions={coachingSessions}
            />
          </Paper>
        </ThemeProvider>
      );
    }
    return <CircularProgress />;
  };

  return <div className={classes.root}>{renderContent()}</div>;
};

export default TeacherSchedules;
