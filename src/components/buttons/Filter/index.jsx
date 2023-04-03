import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useDispatch } from "react-redux";

export const FilterButton = (permission) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        action: permission
      }
    });
  };

  return (
    <Tooltip title={permission.name}>
      <IconButton onClick={handleOpenModal}>
        <FilterListIcon />
      </IconButton>
    </Tooltip>
  );
};

export default FilterButton;
