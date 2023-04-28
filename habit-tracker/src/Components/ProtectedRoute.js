import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem("authToken");

  if (isAuthenticated) {
    return <Outlet component={Component} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;