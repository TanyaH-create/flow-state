import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/authService";
import TodoApp from "../components/TodoApp";

const DashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Flow-State Dashboard</h2>
      <TodoApp />
      <button 
        onClick={() => AuthService.logout()} 
        className="mt-4 p-2 bg-red-500 text-white rounded w-full">
        Logout
      </button>
    </div>
  );
};

export default DashPage;
