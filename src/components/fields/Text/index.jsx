import { TextField as Text } from "@mui/material";
import { Controller } from "react-hook-form";
import { capitalizeFirst } from "../../../_utils";

const TextField = (props) => {
  const { control, errors, name, label, autoFocus } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isError = errors[name] ? true : false;
        const message = isError ? errors[name].message : "";

        return (
          <Text
            {...field}
            autoFocus={autoFocus ?? false}
            margin="dense"
            id={name}
            label={label || capitalizeFirst(name)}
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

export default TextField;
