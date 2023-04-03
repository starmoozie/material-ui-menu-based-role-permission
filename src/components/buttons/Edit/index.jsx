import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import * as Icon from "../../inc/Icon";

export const EditButton = (props) => {
  const IconName = Icon[props.name];
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        open: true,
        action: props,
        data: props.row
      }
    });
  };

  return (
    <Tooltip title={props.name}>
      <IconButton onClick={handleOpenModal}>
        <IconName fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
export default EditButton;
