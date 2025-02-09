 // src/pages/DashPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/authService.ts'; 


const DashPage = () => {
  console.log('DashPage')  
  
  const navigate = useNavigate(); // to navigate programmatically
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Check if the user is logged in (by checking token validity)
    if (!AuthService.loggedIn()) {
      navigate("/"); // Redirect to home if not logged in
      return;
    }

    // If logged in, fetch dashboard data
    const token = AuthService.getToken();

    fetch("api/auth/dash", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Access Denied");
      })
      .then((data) => setMessage(data.message)) // Display server message
      .catch((error) => {
        console.error(error);
        AuthService.logout();
        setMessage("Failed to load dashboard. You have been logged out.");
        navigate("/"); // Redirect after logout
      });
  }, [navigate]); // Runs only on component mount


  const handleLogout = () => {
    AuthService.logout(); // Log out the user when the logout button is clicked
  };

  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p> {/* Display dashboard message */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashPage;
