import React, { useState } from "react";
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
  input,
  options,
  getOptionLabel,
  renderValues,
  multiple,
  limitTags,
  inputComponent: InputComponent,
  meta: { touched, error },
  ...custom
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const loading = options ? false : true;

  const onChange = (_, value, reason) => {
    if (multiple) {
      fields.removeAll();
    }
    if (reason === "select-option" || reason === "remove-option") {
      if (multiple) {
        value.forEach((value, index) => fields.insert(index, value));
      } else {
        setInputValue(value.email);
        input.onChange(value);
      }
    }
  };

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
        size="small"
        limitTags={1}
        loading={loading}
        options={options}
        filterSelectedOptions
        getOptionLabel={getOptionLabel}
        onChange={onChange}
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
