import React from "react";
import TextField from "@material-ui/core/TextField";

export function CustomTextField ({
    label,
    input,
    meta: {touched, invalid, error},
    ...custom,
}) {
    return (
        <TextField 
        label={label} 
        placeholder={label} 
        error={touched&&invalid} 
        helperText={touched && error}
        {...input}
        {...custom}/>
    );
}


