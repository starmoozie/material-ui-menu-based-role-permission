import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { arrayToObject } from "../../_utils";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const CheckboxComponent = (props) => {
  // console.log(2);
  const { rowCount, rows } = props;
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.selected);

  const numSelected = selected.length;

  const handleSelectedCell = (event, rows) => {
    dispatch({
      type: "SET_SELECTED",
      payload: {
        selected: event.target.checked ? rows.map((n) => n.name) : []
      }
    });
  };

  return (
    <Checkbox
      color="primary"
      indeterminate={numSelected > 0 && numSelected < rowCount}
      checked={rowCount > 0 && numSelected === rowCount}
      onChange={(e) => handleSelectedCell(e, rows)}
      inputProps={{
        "aria-label": "select all desserts"
      }}
    />
  );
};

const Check = () => {
  // console.log(1, "rerender again");
  const { rows } = useSelector((state) => state.data, shallowEqual);

  const rowCount = rows.length;

  return (
    <>
      {rowCount ? <CheckboxComponent rowCount={rowCount} rows={rows} /> : <></>}
    </>
  );
};

const TableColumnComponent = (props) => {
  // console.log(4);
  const { columns } = props;

  const dispatch = useDispatch();
  const { order, orderBy } = useSelector((state) => state.order);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";

    dispatch({
      type: "SET_ORDER",
      payload: {
        order: isAsc ? "desc" : "asc",
        orderBy: property
      }
    });
  };

  return (
    <>
      {columns.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.numeric ? "right" : "left"}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={(e) => handleRequestSort(e, headCell.id)}
            sx={{
              ":hover": {
                transform: "translateY(-1px)"
              }
            }}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </>
  );
};

const Column = () => {
  // console.log(3, "rerender again");
  const columns = useSelector((state) => state.columns.columns);

  return (
    <>{columns.length ? <TableColumnComponent columns={columns} /> : <></>}</>
  );
};

const TableHeadList = (permission) => {
  const bulkPermission = arrayToObject(permission?.bulk);

  return (
    <TableHead>
      <TableRow>
        {bulkPermission ? (
          <TableCell padding="checkbox">
            <Check />
          </TableCell>
        ) : (
          <></>
        )}
        <Column />
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadList;
