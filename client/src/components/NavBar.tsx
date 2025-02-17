// NavBar.tsx
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/authService';
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout(); // Log out the user when the logout button is clicked
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#00ABE4' }}>
      <div className="container-fluid">
        {/* Navbar Brand */}
        <Link className="navbar-brand" to="/dash"
        style={{
          fontWeight: 'bold', // Make text bold
          fontSize: '2rem', // Slightly larger text
          color: 'white', // White text
          cursor: 'pointer', // Pointer cursor to indicate it's clickable
        }}
        >
          Dashboard
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
            <span 
              className="nav-link logout-text" 
              onClick={handleLogout} 
              style={{
                fontWeight: 'bold', // Make text bold
                fontSize: '1.1rem', // Slightly larger text
                color: 'white', // White text
                transition: 'all 0.3s ease', // Smooth transition for hover effect
                cursor: 'pointer', // Pointer cursor to indicate it's clickable
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'gray'} // Change color to gray on hover
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'white'} // Reset color when hover ends
            >
              Logout
            </span>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;