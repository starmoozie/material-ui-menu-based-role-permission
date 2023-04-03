import PrivateRoute from "./Private";
import AuthRoute from "./Auth";
import { Suspense, lazy } from "react";
import AuthLayout from "../pages/public/auth";
import { capitalizeFirst } from "../_utils";
import { publicMenu } from "../_fakeData";
import { Route as Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateLayout from "../layouts/private";
import { dashboardMenu } from "../_fakeData";
import { flattenArrayObject } from "../_utils";
import Dashboard from "../pages/private/Dashboard";

export const Route = () => {
  const { menu } = useSelector((state) => state.allMenu);
  console.log(menu);
  return (
    <Routes>
      <Router element={<AuthRoute />}>
        <Router element={<AuthLayout />}>
          {publicMenu.map((item, index) => (
            <Router
              key={index}
              path={item.path}
              exact
              element={<AuthComponent {...item} />}
            />
          ))}
        </Router>
      </Router>
      <Router element={<PrivateRoute />}>
        <Router element={<PrivateLayout />}>
          {
            dashboardMenu.map((item, index) => (<Router key={index} path={item.path} element={<Dashboard {...item} />} />))
          }
          {flattenArrayObject(menu)
            .filter((item) => item.path)
            .map((item, index) => (
              <Router
                key={index}
                path={item.path}
                element={<PrivateComponent {...item} />}
              />
            ))}
        </Router>
      </Router>
    </Routes>
  );
};

const AuthComponent = (props) => {
  const name = capitalizeFirst(props.name);
  const Component = lazy(
    async () =>
      await import(`../pages/public/auth/${name}/index.jsx`)
  );

  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

const PrivateComponent = (props) => {
  const name = props.name;
  const Component = lazy(
    async () => await import(`../pages/private/${name}/index.jsx`)
  );

  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

export default Route;
