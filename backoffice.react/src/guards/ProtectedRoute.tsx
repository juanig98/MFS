import React, { useEffect, useState } from "react";
import { Navigate, Route, RouteProps, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppRoutesEnum } from "../pages/AppRoutes";

const ProtectedRoute = (props: RouteProps) => {
    const { hasToken } = useAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = async () => {
        if (!hasToken) {
            setIsLoggedIn(false);
            return navigate(AppRoutesEnum.LOGIN);
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment> {isLoggedIn ? props.children : null}</React.Fragment>
    );
}
export default ProtectedRoute;