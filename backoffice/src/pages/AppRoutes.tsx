import { Routes, Route, useNavigate } from "react-router-dom";
import GuardedRoute from "../guards/GuardedRoute";
import Login from "./public/Login";
import { Dashboard } from "./authenticated/Dashboard";

interface AppRoutesProp {
  /**
   * True, if the user is authenticated, false otherwise.
   */
  isAuthenticated: boolean;
}

export const enum AppRoutesEnum {
  LOGIN = "/login",
  HOME = "/home",
  ABOUT = "/about",
  DASHBOARD = "/dashboard",
  LOGOUT = "/logout",
}

const AppRoutes = (props: AppRoutesProp): JSX.Element => {
  const navigate = useNavigate();
  const { isAuthenticated } = props;

  return (
    <Routes>
      {/* Unguarded Routes */}
      <Route path={AppRoutesEnum.ABOUT} element={<p>About Page</p>} />
      {/* Non-Authenticated Routes: accessible only if user in not authenticated */}
      <Route
        element={
          <GuardedRoute
            isRouteAccessible={!isAuthenticated}
            redirectRoute={AppRoutesEnum.DASHBOARD}
          />
        }
      >
        {/* Login Route */}
        <Route path={AppRoutesEnum.LOGIN} element={<Login />} />
      </Route>

      {/* -------------------
            Authenticated Routes 
        ------------------- */}
      <Route
        element={
          <GuardedRoute isRouteAccessible={isAuthenticated} redirectRoute={AppRoutesEnum.LOGIN} />
        }
      >
        <Route path={AppRoutesEnum.DASHBOARD} element={<Dashboard/>} /> 
      </Route>
      {/* Not found Route */}
      <Route path="*" element={<p>Page Not Found</p>} />
    </Routes>
  );
};

export default AppRoutes;
