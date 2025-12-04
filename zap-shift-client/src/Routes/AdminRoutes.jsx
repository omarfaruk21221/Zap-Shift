import React from "react";
import useAuth from "../Hooks/useAuth";
import RoundLoader from "../Components/Spinner/RoundLoader";
import useRole from "../Hooks/useRole";

const AdminRoutes = ({ children }) => {
  const {  loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <RoundLoader />;
  }
  if (role !== "admin") {
    return <p>unKnown admin </p>;
  }

  return children;
};

export default AdminRoutes;
