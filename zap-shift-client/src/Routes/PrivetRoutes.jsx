import React from "react";
import useAuth from "../Hooks/useAuth";
import DotLoading from "../Components/Spinner/DotLoading";
import { Navigate, useLocation } from "react-router";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("location", location);
// console.log({loading,user})
  if (loading) {
    return <DotLoading />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/signin"></Navigate>;
  }

  return children;
};

export default PrivetRoutes;
