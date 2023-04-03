import { useState, useMemo } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import * as Buttons from "../../components/buttons";
import { arrayToObject } from "../../_utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const RenderData = (props) => {
  const {
    linePermission,
    bulkPermission,
    row,
    index,
    isSelected,
    handleClick,
    columns
  } = props;
  const isItemSelected = isSelected(row.name);
  const labelId = `enhanced-table-checkbox-${index}`;
  const permission = arrayToObject(linePermission);

  return (
    <TableRow tabIndex={-1} key={row.name} hover>
      {bulkPermission?.length ? (
        <TableCell padding="checkbox" sx={{ borderBottom: "none" }}>
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId
            }}
            onClick={(event) => handleClick(event, row.name)}
          />
        </TableCell>
      ) : (
        <></>
      )}
      {columns.map((column) => {
        const { Cell } = column;

        return (
          <TableCell
            key={column.id}
            align={column.numeric ? "right" : "left"}
            sx={{ borderBottom: "none" }}
          >
            <Cell data={row} />
          </TableCell>
        );
      })}
      <TableCell padding="checkbox" sx={{ borderBottom: "none" }}>
        {permission ? (
          <Stack spacing={0} direction="row">
            <ButtonPermission {...permission} row={row} />
          </Stack>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
};

const TableRows = (props) => {
  console.log("row");

  const { rows, line, bulk } = props;
  const { selected } = useSelector((state) => state.selected);
  const { order, orderBy } = useSelector((state) => state.order);
  const { page, rowsPerPage } = useSelector((state) => state.pagination);
  const data = useSelector((state) => state.columns.columns);
  const columns = useMemo(() => data, [data]);

  const dispatch = useDispatch();

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    dispatch({
      type: "SET_SELECTED",
      payload: {
        selected: newSelected
      }
    });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => (
          <RenderData
            linePermission={line}
            bulkPermission={bulk}
            row={row}
            key={row.name}
            index={index}
            isSelected={isSelected}
            handleClick={handleClick}
            columns={columns}
          />
        ))}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 52 * emptyRows
          }}
        >
          <TableCell colSpan={6} sx={{ borderBottom: "none" }} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default function TableBodyList(props) {
  console.log("body");
  const row = useSelector((state) => state.data.rows);

  return <>{row.length ? <TableRows rows={row} {...props} /> : <></>}</>;
}

const ButtonPermission = (permission) => {
  const { row } = permission;

  return (
    <>
      {permission.children.map((permission) => {
        const Component = Buttons[`${permission.name}Button`];

        return (
          <Component
            key={permission.name}
            {...permission}
            row={row}
            type="line"
          />
        );
      })}
    </>
  );
};
