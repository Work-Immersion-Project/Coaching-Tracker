import React from "react";
import { TimePicker } from "@material-ui/pickers";
import renderHelperFormText from "../helpers/renderHelperFormText";

const CustomTimePicker = ({
  input: { value, onBlur, ...inputProps },
  meta: { error, invalid },
  label,
  inputComponent: InputComponent,
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
      renderInput={(props) => (
        <InputComponent
          {...props}
          label={label}
          error={error && invalid}
          onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
        />
      )}
      value={value ? new Date(value) : null}
      onChange={onChange}
    />
  );
};
export default CustomTimePicker;
