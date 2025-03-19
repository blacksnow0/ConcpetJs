import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthRedirect = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRedirect;
