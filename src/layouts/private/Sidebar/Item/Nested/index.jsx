import { useMemo, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocation, useNavigate } from "react-router-dom";
import * as Icon from "../../../../../components/inc/Icon";
import { useDispatch } from "react-redux";

export default function NestedItemSidebar(item) {
  const IconName = useMemo(() => Icon[item.name], [item]);
  const [collapse, setCollapse] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCollapse = (item) => {
    if (item.children) {
      setCollapse(collapse !== item.id ? item.id : "");
    } else {
      dispatch({
        type: "SET_ACTIVE_MENU",
        data: item
      });
      navigate(item.path);
    }
  };

  return (
    <>
      <ListItem disablePadding sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListItemButton
          selected={location.pathname === item.path}
          onClick={() => handleCollapse(item)}
        >
          <ListItemIcon>
            <IconName />
          </ListItemIcon>
          <ListItemText primary={item.name} />
          {collapse === item.id ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowLeftIcon />
          )}
        </ListItemButton>
      </ListItem>

      {item.children.map((child) => {
        const IconName = Icon[child.name];

        return (
          <Collapse
            in={collapse === item.id}
            key={child.id}
            unmountOnExit
            sx={{ pl: 2, pr: 2 }}
          >
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={location.pathname === child.path}
                onClick={() => handleCollapse(child)}
              >
                <ListItemIcon>
                  <IconName />
                </ListItemIcon>
                <ListItemText primary={child.name} />
              </ListItemButton>
            </List>
          </Collapse>
        );
      })}
    </>
  );
}
