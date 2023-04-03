import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../_hooks/auth";

const AuthRoute = () => {
  const { cookies } = useAuth();
  const location = useLocation();
  console.log("Auth Route");

  return (
    <>
      {cookies.token ? (
        <Navigate to={`/`} state={{ from: location }} />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default AuthRoute;
