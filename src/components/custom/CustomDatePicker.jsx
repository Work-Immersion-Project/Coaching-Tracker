import React from "react";
import { DatePicker } from "@material-ui/pickers";
import renderHelperFormText from "../helpers/renderHelperFormText";

const CustomDatePicker = ({
  input: { onBlur, value, ...inputProps },
  meta: { submitting, touched, error },
  inputComponent: InputComponent,
  label,
  dateFormat,
  ...custom
}) => {
  return (
    <DatePicker
      {...inputProps}
      {...custom}
      allowKeyboardControl={false}
      renderInput={(props) => <InputComponent {...props} />}
      value={value ? new Date(value) : null}
      label={label}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      format={dateFormat}
      error={error && touched}
    />
  );
};
export default CustomDatePicker;
