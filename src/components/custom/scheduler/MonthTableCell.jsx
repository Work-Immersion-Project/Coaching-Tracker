import React from "react";
import { MonthView } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { isDayBehind } from "../../../utils";
import classNames from "clsx";

const MonthTableCell = withStyles(({ palette }) => ({
  dayBehindCell: {
    backgroundColor: "#999",
    "&:hover": {
      backgroundColor: "#999",
    },
    "&:focus": {
      backgroundColor: "#999",
    },
  },
}))(({ classes, onCellClick, ...restProps }) => {
  const isCellDisabled = isDayBehind(restProps.startDate);
  return (
    <MonthView.TimeTableCell
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

export default MonthTableCell;
