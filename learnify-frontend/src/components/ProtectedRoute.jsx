// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem("isAuth");
  return isAuth === "true" ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
