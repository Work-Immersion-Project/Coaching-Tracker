import React from "react";
import { Select } from "@material-ui/core";
import renderHelperFormText from "../helpers/renderHelperFormText";

const CustomSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  icon_component,
  ...custom
}) => {
  return (
    <>
      <Select {...input} {...custom}>
        {children}
      </Select>
      {renderHelperFormText({ touched, error })}
    </>
  );
};

export default CustomSelectField;
