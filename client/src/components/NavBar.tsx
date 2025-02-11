// NavBar.tsx
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/authService';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout(); // Log out the user when the logout button is clicked
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="navbar p-3 d-flex justify-content-between align-items-center">
      <h1 className="dash-header">Welcome to Your Dashboard!</h1>
      <button onClick={handleLogout} className="btn-logout btn-sm sm-auto">Logout</button>
    </nav>
  );
};

export default NavBar;

