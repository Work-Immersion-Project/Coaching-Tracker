import React from "react";
import { DayView } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { isDayBehind } from "../../../utils";
import classNames from "clsx";
const DayTableCell = withStyles(({ palette }) => ({
  dayBehindCell: {
    backgroundColor: "#111",
    "&:hover": {
      backgroundColor: "#111",
    },
    "&:focus": {
      backgroundColor: "#111",
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
