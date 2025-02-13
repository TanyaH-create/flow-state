import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import DashPage from "./pages/DashPage";
import MainPage from "./pages/MainPage";
import TodoApp from "./components/TodoApp";

const App: React.FC = () => {
  return (
    <Router> {/* Only ONE Router! */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Outlet /> {/* This will render the child routes */}
      </div>
    </Router>
  );
};

export default App;

