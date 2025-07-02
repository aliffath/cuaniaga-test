import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!userData) {
      alert("Anda harus login terlebih dahulu!");
    }
  }, [userData]);
  return userData ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
