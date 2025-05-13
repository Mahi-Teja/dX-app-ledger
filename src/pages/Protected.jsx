// pages/RR.jsx (aka ProtectedRoute)
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("dxData")));
  const [user, setUser] = useState();

  return data?.user?.username ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
