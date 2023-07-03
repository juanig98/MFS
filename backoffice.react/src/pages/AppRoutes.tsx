import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import GuardedRoute from "../guards/GuardedRoute";
import Login from "./public/Login";
import { Dashboard } from "./authenticated/Dashboard";
import ProtectedRoute from "../guards/ProtectedRoute";

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
  ROOT = "/",
  DASHBOARD = "/dashboard",
  LOGOUT = "/logout",
}

const AppRoutes = (): JSX.Element => {

  return (
    <BrowserRouter basename={'/'}>
      <Routes>

        <Route path={AppRoutesEnum.LOGIN} element={<Login />} />

        <Route path={AppRoutesEnum.ROOT} element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path={AppRoutesEnum.DASHBOARD} element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
