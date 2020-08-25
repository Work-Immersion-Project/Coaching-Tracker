import React from "react";
import { WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { isDayBehind } from "../../../utils";
import classNames from "clsx";
const WeekTableCell = withStyles(({ palette }) => ({
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
    <WeekView.TimeTableCell
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
export default WeekTableCell;
