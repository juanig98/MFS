// import * as jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { AuthService } from "../services/auth/auth.service";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";

const COOKIE_TOKEN = "token";

export function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_TOKEN]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  useJwt(cookies.token);

  const authService = new AuthService();

  const logout = () => {
    setUser(null);
    setisAuthenticated(false);
    removeCookie(COOKIE_TOKEN);
    setTimeout(() => { 
      location.href = location.origin
    }, 1000);
  };

  useEffect(() => {
    async function getUserDetails() {
      const { data } = await authService.validate(cookies.token);

      if (!data) {
        setisAuthenticated(false);
        return;
      }
      setUser(data.user);
      setisAuthenticated(true);
    }
    getUserDetails();
  }, []);

  return { user, isAuthenticated, logout };
}
