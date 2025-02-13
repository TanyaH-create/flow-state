import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashPage from "./pages/DashPage";
import HomePage from "./pages/MainPage";
import TodoApp from "./components/TodoApp";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashPage />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

