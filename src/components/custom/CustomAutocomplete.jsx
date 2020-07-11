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
  inputComponent: InputComponent,
  meta: { touched, invalid, error },
  ...custom
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const loading = options === null && open;
  const fieldValues = fields.getAll();

  return (
    <AutoComplete
      {...custom}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      disableClearable
      loading={loading}
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
      multiple
      onChange={(event, value, reason) => {
        fields.removeAll();
        value.forEach((val, index) => {
          fields.insert(index, val);
        });
      }}
      renderInput={(params) => (
        <InputComponent
          className={classes.root}
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          error={error || touched}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CustomAutoComplete;
