import React, {
    useContext,
    createContext,
    useMemo,
    useCallback,
    useEffect
  } from "react";
  import { useCookies } from "react-cookie";
  import Cookies from "universal-cookie";
  import { useDispatch, useSelector } from "react-redux";
  import { menu, dashboardMenu } from "../_fakeData";
  
  const AuthContext = createContext(null);
  
  export const AuthProvider = ({ children }) => {
    const [cookies, setCookies, removeCookie] = useCookies(null);
    const dispatch = useDispatch();
    const privateMenu = useSelector((state) => state.allMenu.menu);

    useEffect(() => {
      if (cookies.token && !privateMenu.length) {
        dispatch({
          type: "SET_MENU",
          payload: [...dashboardMenu, ...menu]
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const login = useCallback((token, callback) => {
      setCookies("token", token);
      // setCookies('menu', menu);
      // dispatch({
      //   type: "SET_MENU",
      //   payload: menu
      // });
      callback();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const logout = useCallback((callback) => {
      removeCookie("token");
      // callback();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(cookies.token, 1);
  
    const value = useMemo(() => ({ cookies, login, logout }), [
      cookies,
      login,
      logout
    ]);
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  