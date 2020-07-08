import React from "react";
import { DatePicker } from "@material-ui/pickers";
import renderHelperFormText from "../helpers/renderHelperFormText";

const CustomDatePicker = ({
  input: { onBlur, value, ...inputProps },
  meta: { submitting, touched, error },
  label,
  dateFormat,
  ...custom
}) => {
  const onChange = (date) => {
    Date.parse(date)
      ? inputProps.onChange(date.toISOString())
      : inputProps.onChange(null);
  };

  return (
    <DatePicker
      {...inputProps}
      {...custom}
      value={value ? new Date(value) : null}
      label={label}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      format={dateFormat}
      error={error && touched}
      onChange={onChange}
    />
  );
};
export default CustomDatePicker;
