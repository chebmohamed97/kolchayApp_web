import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      navigate("/");
    };

    handleLogout();
  }, [logout, navigate]);

  return <div>Logging out...</div>; // You can display a loading message or redirect message if needed
};

export default LogoutPage;
