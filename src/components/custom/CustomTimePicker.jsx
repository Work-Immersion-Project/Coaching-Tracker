import React from "react";
import { TimePicker } from "@material-ui/pickers";
import renderHelperFormText from "../helpers/renderHelperFormText";

const CustomTimePicker = ({
  input: { value, onBlur, ...inputProps },
  meta: { touched, error },
  label,
  ...custom
}) => {
  const onChange = (date) => {
    Date.parse(date)
      ? inputProps.onChange(date.toISOString())
      : inputProps.onChange(null);
  };

  return (
    <TimePicker
      {...inputProps}
      {...custom}
      value={value ? new Date(value) : null}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      label={label}
      error={error && touched}
      onChange={onChange}
    />
  );
};
export default CustomTimePicker;
