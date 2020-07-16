import React, { useState } from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AutoComplete from "@material-ui/lab/Autocomplete";
import renderHelperFormText from "../helpers/renderHelperFormText";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
}));

const CustomAutoComplete = ({
  label,
  fields,
  options,
  getOptionLabel,
  renderValues,
  multiple,
  inputComponent: InputComponent,
  meta: { touched, invalid, error },
  ...custom
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const loading = options ? false : true;

  return (
    <>
      <AutoComplete
        {...custom}
        multiple={multiple}
        inputValue={inputValue}
        onInputChange={(_, value, reason) => {
          if (reason === "input") {
            setInputValue(value);
          }
        }}
        loading={loading}
        options={options}
        filterSelectedOptions
        getOptionLabel={getOptionLabel}
        onChange={(_, value, reason) => {
          fields.removeAll();
          if (reason === "select-option" || reason === "remove-option") {
            value.forEach((value, index) => fields.insert(index, value));
          }
        }}
        renderInput={(params) => (
          <InputComponent
            {...params}
            className={classes.root}
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            error={error || touched}
            label={label}
          />
        )}
      />
       {renderHelperFormText({ touched, error })}
    </>
  );
};

export default CustomAutoComplete;
