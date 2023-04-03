import { useRef, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
  Typography
} from "@mui/material";

// project imports
import MainCard from "./Card";
import Transitions from "./Transition";
import * as Icon from "../Icon";
import { useAuth } from "../../../_hooks/auth";

// ==============================|| PROFILE MENU ||============================== //

const MainPopper = (props) => {
  const { anchorRef, open, setOpen, items } = props;
  const theme = useTheme();
  const { logout } = useAuth();

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, item) => {
    handleClose(event);
    logout("token", () => {
      navigate(from, { replace: true });
    });
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open, anchorRef]);

  return (
    <Popper
      placement="bottom-end"
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      popperOptions={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 14]
            }
          }
        ]
      }}
    >
      {({ TransitionProps }) => (
        <Transitions in={open} {...TransitionProps}>
          <ClickAwayListener onClickAway={handleClose}>
            <MainCard border={false} content={false} boxShadow>
              <Box sx={{ p: 2 }}>
                <List
                  component="nav"
                  sx={{
                    width: "100%",
                    maxWidth: 350,
                    minWidth: 60,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "10px",
                    [theme.breakpoints.down("md")]: {
                      minWidth: "100%"
                    },
                    "& .MuiListItemButton-root": {
                      mt: 0.5
                    }
                  }}
                >
                  {items.map((item) => {
                    const IconList = Icon[item.icon];

                    return (
                      <ListItemButton
                        key={item.name}
                        onClick={(event) => handleListItemClick(event, item)}
                      >
                        <ListItemIcon>
                          <IconList />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">{item.name}</Typography>
                          }
                        />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Box>
            </MainCard>
          </ClickAwayListener>
        </Transitions>
      )}
    </Popper>
  );
};

export default MainPopper;
