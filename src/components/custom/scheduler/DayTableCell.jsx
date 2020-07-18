import React from "react";
import { DayView } from "@devexpress/dx-react-scheduler-material-ui";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import { isDayBehind } from "../../../utils";
import classNames from "clsx";
const DayTableCell = withStyles(({ palette }) => ({
  dayBehindCell: {
    backgroundColor: fade(palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
  },
}))(({ classes, onCellClick, ...restProps }) => {
  const isCellDisabled = isDayBehind(restProps.startDate);
  return (
    <DayView.TimeTableCell
      className={classNames({
        [classes.dayBehindCell]: isCellDisabled,
      })}
      onClick={() => {
        if (!isCellDisabled) {
          onCellClick(restProps);
        }
      }}
      {...restProps}
    />
  );
});

export default DayTableCell;
