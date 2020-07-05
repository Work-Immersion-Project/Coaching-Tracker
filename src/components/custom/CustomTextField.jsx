import React from "react";
import { InputBase } from "@material-ui/core";

const CustomTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <InputBase
      label={label}
      error={touched && invalid}
      {...input}
      {...custom}
    />
  );
};
export default CustomTextField;
