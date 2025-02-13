import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashPage from "./pages/DashPage";
import MainPage from "./pages/MainPage";
import TodoApp from "./components/TodoApp";

const App: React.FC = () => {
  return (
    <Router> {/* Only ONE Router! */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dashboard" element={<DashPage />} />
          <Route path="/todo" element={<TodoApp />} />
          {/* Add other routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

