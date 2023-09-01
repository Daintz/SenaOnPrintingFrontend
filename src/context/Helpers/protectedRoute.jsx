import { Navigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import useToken from "./useToken";

export const ProtectedRoute = ({ children }) => {
  const { token } = useToken();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <DashboardLayout>{children}</DashboardLayout>;
};