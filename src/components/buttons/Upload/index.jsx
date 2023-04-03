import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import * as Icon from "../../inc/Icon";

export const UploadButton = (permission) => {
  const IconName = Icon[permission.name];

  const handleClick = () => {
    console.log(permission);
  };

  return (
    <Tooltip title={permission.name}>
      <IconButton onClick={handleClick}>
        <IconName />
      </IconButton>
    </Tooltip>
  );
};
export default UploadButton;
