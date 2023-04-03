import { useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import * as Icon from "../../../../../components/inc/Icon";

export default function SingleItemSidebar(item) {
  const IconName = useMemo(() => Icon[item.name], [item]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClicked = () => {
    navigate(item.path, { state: item });
  };

  return (
    <ListItem disablePadding sx={{ paddingLeft: 2, paddingRight: 2 }}>
      <ListItemButton
        selected={location.pathname === item.path}
        onClick={handleClicked}
      >
        <ListItemIcon>
          <IconName />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </ListItem>
  );
}
