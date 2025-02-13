import { Routes, Route } from "react-router-dom";
import DashPage from "./pages/DashPage";
import MainPage from "./pages/MainPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/dashboard" element={<DashPage />} />
    </Routes>
  );
};

export default App;
