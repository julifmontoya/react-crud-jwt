import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, authTokens } = useContext(AuthContext);

  // If user and authTokens are not null, return an outlet that will render child elements
  // If either of them is null, return element that will navigate to login page
  return user && authTokens ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
