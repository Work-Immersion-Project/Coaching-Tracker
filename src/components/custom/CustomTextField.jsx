import React from "react";
import { InputBase } from "@material-ui/core";
import renderHelperFormText from "../helpers/renderHelperFormText";
const CustomTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <>
      <InputBase
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
      />
      {renderHelperFormText({ touched, error })}
    </>
  );
};
export default CustomTextField;
