import { useMemo } from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { arrayToObject } from "../../_utils";
import * as Buttons from "../../components/buttons";

export default function TableToolbar(permission) {
  const { selected } = useSelector((state) => state.selected);
  const numSelected = useMemo(() => selected.length, [selected]);
  const actionPermission = arrayToObject(permission?.action);
  const optionPermission = arrayToObject(permission?.option);
  const bulkPermission = arrayToObject(permission?.bulk);
  const filterPermission = arrayToObject(permission?.filter);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {!numSelected ? (
        <Stack spacing={2} direction="row" sx={{ flex: "1" }}>
          {actionPermission ? (
            <ButtonPermission {...actionPermission} type={`action`} />
          ) : (
            <></>
          )}
          {optionPermission ? (
            <ButtonPermission {...optionPermission} />
          ) : (
            <></>
          )}
        </Stack>
      ) : (
        <>
          <ButtonPermission {...bulkPermission} selected={selected} />
          <Typography
            sx={{ flex: "1 1 100%", ml: 1 }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        </>
      )}

      {!numSelected && filterPermission ? (
        <ButtonPermission {...filterPermission} type="filter" />
      ) : (
        <></>
      )}
    </Toolbar>
  );
}

const ButtonPermission = (permissions) => {
  const { selected, type } = permissions;

  return (
    <>
      {permissions.children.map((permission) => {
        const Component = Buttons[`${permission.name}Button`];

        return (
          <Component
            key={permission.name}
            {...permission}
            selected={selected}
            type={type}
          />
        );
      })}
    </>
  );
};
