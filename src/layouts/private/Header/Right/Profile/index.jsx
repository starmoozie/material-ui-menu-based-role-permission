import { useState, useRef, useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import MainPopper from "../../../../../components/inc/Poper";

const items = [
  {
    name: "Account Settings",
    icon: "Setting",
    action: {
      api: "",
      type: ""
    }
  },
  {
    name: "Logout",
    icon: "Logout",
    action: {
      api: "",
      type: ""
    }
  }
];

const Profile = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Avatar
        src={`User1`}
        sx={{
          ...theme.typography.mediumAvatar,
          margin: "8px 0 8px 8px !important",
          cursor: "pointer"
        }}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleToggle}
      />
      {open && (
        <MainPopper
          anchorRef={anchorRef}
          open={open}
          setOpen={setOpen}
          items={items}
        />
      )}
    </>
  );
};

export default Profile;
