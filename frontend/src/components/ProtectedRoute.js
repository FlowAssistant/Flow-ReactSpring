// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const username = localStorage.getItem("username");

    return username ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
