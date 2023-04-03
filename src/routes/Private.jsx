import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../_hooks/auth";

export const PrivateRoute = () => {
  const { cookies } = useAuth();
  const location = useLocation();
  console.log(cookies, "private");

  return (
    <>
      {cookies.token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </>
  );
};

export default PrivateRoute;
