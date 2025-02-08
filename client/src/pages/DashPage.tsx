// src/pages/DashPage.tsx
import { useEffect, useState } from 'react';
import AuthService from '../utils/authService.ts'; 

  const DashPage = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      fetch('/users/dash', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in Authorization header
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Access Denied');
          }
        })
        .then((data) => setMessage(data.message)) // Display the response message
        .catch((error) => {
          console.error(error);
          AuthService.logout();
          setMessage('Failed to load dashboard. You have been logged out');
        });
    } else {
      setMessage('No token found');
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout(); // Log out the user when the logout button is clicked
  };


  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashPage;
