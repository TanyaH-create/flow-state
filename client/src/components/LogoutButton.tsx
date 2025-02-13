import React from "react";
import AuthService from "../utils/authService";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  return (
    <button 
      onClick={handleLogout} 
      className="mt-4 p-2 bg-red-500 text-white rounded w-full">
      Logout
    </button>
  );
};

export default LogoutButton;