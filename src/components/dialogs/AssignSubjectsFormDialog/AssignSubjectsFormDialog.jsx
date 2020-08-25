import React, { useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "1em",
  },
  chipsWrapper: {
    margin: "1em 0.25em",
  },
  title: {
    color: "black !important",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        color: "black",
        backgroundColor: "white",
      },
    },

    MuiInputLabel: {
      root: {
        color: "black",
      },
    },

    MuiInput: {
      root: {
        color: "white",
      },
      underline: {
        minWidth: "270px",
        "&:before": {
          borderBottom: "1px solid #4EC8F4",
        },
        "&:after": {
          borderBottom: `2px solid #4EC8F4`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid #4EC8F4`,
        },
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
    },
    MuiSvgIcon: {
      root: {
        color: "#4EC8F4",
      },
    },
  },
});

const AssignSubjectsFormDialog = (props) => {
  const classes = useStyles();
  const { control, errors, handleSubmit } = useForm();
  const {
    open,
    onDialogClose,
    title,
    onNegativeClick,
    onPositiveClick,
    pristined,
    getSubjectsFields,
    currentSubjects,
    subjects,
  } = props;

  useEffect(() => {
    getSubjectsFields();
  }, [getSubjectsFields]);

  return (
    <ThemeProvider theme={formTheme}>
      <Dialog open={open} onClose={onDialogClose}>
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <form onSubmit={handleSubmit(onPositiveClick)}>
          <DialogContent>
            <Grid container direction="column" justify="center" spacing={1}>
              <Grid item>
                <Controller
                  name="subjects"
                  defaultValue={[]}
                  control={control}
                  rules={{
                    validate: (subjects = []) => subjects.length !== 0,
                  }}
                  render={(props) => {
                    return (
                      <Autocomplete
                        options={
                          subjects !== null
                            ? subjects.filter(
                                (s) =>
                                  currentSubjects.filter((cs) => s.ID === cs.ID)
                                    .length === 0
                              )
                            : []
                        }
                        getOptionLabel={(option) => option.subjectName}
                        multiple
                        filterSelectedOptions
                        size={"small"}
                        onChange={(_, data) => {
                          props.onChange(data);
                        }}
                        renderInput={(props) => (
                          <TextField
                            {...props}
                            error={errors.subjects !== undefined}
                            label="Assign Subjects"
                            helperText={
                              errors.subjects !== undefined ? "Required" : ""
                            }
                          />
                        )}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onNegativeClick}>Cancel</Button>
            <Button disabled={pristined} type="submit">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </ThemeProvider>
  );
};

export default AssignSubjectsFormDialog;
