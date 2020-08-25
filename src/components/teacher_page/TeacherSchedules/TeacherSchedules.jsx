import React, { useEffect } from "react";
import {
  Paper,
  CircularProgress,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomSchedulerContainer from "../../custom/scheduler/CustomSchedulerContainer";
import { toInteger } from "lodash";

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
    borderRadius: "30px",
    overflow: "hidden",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "white",
      },
    },

    MuiPopover: {
      paper: {
        backgroundColor: "white",
      },
    },

    MuiTypography: {
      h6: {
        color: "#000000",
      },
    },

    DayScaleEmptyCell: {
      emptyCell: {
        backgroundColor: "white",
      },
    },

    MuiTableBody: {
      root: {
        backgroundColor: "white",
      },
    },
    TickCell: {
      cell: {
        borderBottom: "1px solid white",
      },
    },

    Cell: {
      dayOfWeek: {
        color: "#222222",
      },
      dayOfMonth: {
        color: "#222222",
      },
      highlightedText: {
        color: "#00364D",
      },
    },

    MuiIconButton: {
      root: {
        color: "#00364D",
      },
    },

    MuiButton: {
      root: {
        backgroundColor: "#00364D",
        "&:hover": {
          backgroundColor: "#001025",
          "@media (hover: none)": {
            backgroundColor: "#00364D",
          },
        },
        color: "white"
      },
      text: {
        color: "white",
      },
    },
    MuiInputBase: {
      root: {
        color: "#00364D",
      },
    },

    Label: {
      text: {
        color: "#000000",
      },
    },

    MuiOutlinedInput: {
      root: {
        "&$focused $notchedOutline": {
          borderColor: "#00364D",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#00364D",
        },
      },
      notchedOutline: {
        borderColor: "#00364D",
      },
    },

    MuiTableCell: {
      head: {
        color: "#00364D",
      },
      body: {
        color: "black",
      },
    },

    MuiMenuItem: {
      root: {
        color: "#00364D",
      },
    },
    MuiSelect: {
      icon: {
        color: "#00364D",
      },
    },
  },
});

const TeacherSchedules = ({
  isLoading,
  coachingSessions,
  showModal,
  hideModal,

  match,
  ...restProps
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (match.params.id) {
      showModal("COACHING_SESSION_MODAL", {
        onDialogClose: () => hideModal(),
        selectedCoachingSessionID: toInteger(match.params.id),
      });
    }
  }, [match.params.id, showModal, hideModal]);

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
