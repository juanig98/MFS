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
  DASHBOARD = "/dashboard",
  LOGOUT = "/logout",
}

const AppRoutes = (): JSX.Element => {  

  return (
    <BrowserRouter basename={'/'}>
      <Routes>

        <Route path='login' element={<Login />} />


        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
