import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import UseAdmin from "../hooks/UseAdmin";
import UseAuth from "../hooks/UseAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isAdmin, isAdminLoading] = UseAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
