import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";

export const LeftHeader = () => {
  const location = useLocation();

  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ textTransform: "capitalize", flexGrow: 1 }}
    >
      {location.pathname.replace("/", "") || "Dashboard"}
    </Typography>
  );
};

export default LeftHeader;
