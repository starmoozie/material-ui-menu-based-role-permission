import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { capitalizeFirst } from "../../../_utils";

const Password = (data) => {
  const { control, errors, name, label, autoFocus } = data;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isError = errors[name] ? true : false;
        const message = isError ? errors[name].message : "";

        return (
          <TextField
            {...field}
            autoFocus={autoFocus ?? false}
            margin="dense"
            id={name}
            label={label}
            type="password"
            fullWidth
            variant="standard"
            error={isError}
            helperText={capitalizeFirst(message)}
          />
        );
      }}
    />
  );
};

export default Password;
