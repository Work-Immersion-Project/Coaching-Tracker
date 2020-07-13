import React, { useState } from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AutoComplete from "@material-ui/lab/Autocomplete";

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
  inputComponent: InputComponent,
  meta: { touched, invalid, error },
  ...custom
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const fieldValues = fields.getAll();

  return (
    <>
      <AutoComplete
        {...custom}
        inputValue={inputValue}
        onInputChange={(event, value, reason) => {
          if (reason === "input") {
            setInputValue(value);
          }
        }}
        options={
          fieldValues
            ? options.filter(
                (option) =>
                  fieldValues.filter(
                    (fieldValue) => fieldValue.title === option.title
                  ).length === 0
              )
            : options
        }
        getOptionLabel={getOptionLabel}
        onChange={(event, value, reason) => {
          if (reason === "select-option") {
            setInputValue("");
            fields.push(value);
          }
        }}
        renderInput={(params) => (
          <InputComponent
            className={classes.root}
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            error={error || touched}
            label={label}
          />
        )}
      />
      {renderValues(fields)}
    </>
  );
};

export default CustomAutoComplete;
