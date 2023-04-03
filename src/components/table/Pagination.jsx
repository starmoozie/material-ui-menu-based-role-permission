import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";

export default function TablePaginationList(props) {
  const dispatch = useDispatch();
  const { page, rowsPerPage } = useSelector((state) => state.pagination);
  const { rows } = useSelector((state) => state.data);

  const handleChangePage = (event, newPage) => {
    dispatch({
      type: "SET_PAGINATION",
      payload: {
        page: newPage
      }
    });
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch({
      type: "SET_PAGINATION",
      payload: {
        page: 0,
        rowsPerPage: parseInt(event.target.value, 10)
      }
    });
  };

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
