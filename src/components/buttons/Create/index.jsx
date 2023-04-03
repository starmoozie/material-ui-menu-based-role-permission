import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";

export const CreateButton = (permission) => {
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
    <Button
      size="large"
      variant="contained"
      onClick={handleOpenModal}
      startIcon={<AddIcon />}
    >
      {permission.name}
    </Button>
  );
};

export default CreateButton;
