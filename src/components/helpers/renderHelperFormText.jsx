import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import { styled } from "@material-ui/core/styles";

const CustomHelperText = styled(FormHelperText)({
  color: "red",
  fontWeight: "bold",
  marginTop: "0.3em",
});

export default function renderFormHelper({ touched, error }) {
  if (!(touched && error)) {
    return;
  } else {
    return <CustomHelperText>{touched && error}</CustomHelperText>;
  }
}
