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
  return (
    <TimePicker
      {...inputProps}
      {...custom}
      value={value}
      renderInput={(props) => (
        <InputComponent {...props} label={label} error={error && invalid} />
      )}
    />
  );
};
export default CustomTimePicker;
