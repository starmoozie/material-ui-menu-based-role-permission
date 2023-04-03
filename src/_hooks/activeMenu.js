import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { flattenArrayObject } from "../_utils";

export const useActiveMenu = () => {
  const [activeMenu, setActiveMenu] = useState();

  const location = useLocation();
  const menu = useSelector((state) => state.allMenu.menu);

  useEffect(() => {
    setActiveMenu(
      flattenArrayObject(menu).find((menu) => menu.path === location.pathname)
    );
  }, [menu, location]);

  return {
    activeMenu: activeMenu
  };
};
