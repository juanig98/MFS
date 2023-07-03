import React, { useEffect, useState } from "react";
import { Navigate, Route, RouteProps, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = (props: RouteProps) => {
    const { hasToken } = useAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = async () => {
        console.log({ hasToken });

        if (!hasToken) {
            setIsLoggedIn(false); 
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment> {isLoggedIn ? props.children : null }</React.Fragment>
    );
}
export default ProtectedRoute;