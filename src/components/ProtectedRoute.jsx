import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.userInfo);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role?.toLowerCase())) {
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;
