import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/authService.ts';
import TaskList from '../components/TaskList';
import AddTaskButton from '../components/AddTaskButton.tsx';

const DashPage = () => {
  console.log('DashPage')  
  
  const navigate = useNavigate(); // to navigate programmatically
  const [tasks, setTasks] = useState<[]>([]);
 // const [message, setMessage] = useState<string>('');
  // const [tasks, setTasks] = useState<any[]>([]); // Store user tasks

  useEffect(() => {
    // Check if the user is logged in (by checking token validity)
    if (!AuthService.loggedIn()) {
      navigate("/"); // Redirect to home if not logged in
      return;
    }
    console.log('User is logged in')
    // If logged in, fetch dashboard data
    const token = AuthService.getToken();
    
    fetch("api/auth/dash", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    })
      .then((response) => {
        console.log(response.json)
        if (response.ok) return response.json();
        console.log('THROWING ERROR')
        throw new Error("Access Denied");
      })
      .then((data) => {
        console.log('Fetched Data:', data);
        setTasks(data.tasks || []); // Store fetched tasks
      })
      .catch((error) => {
        console.log("ERROR THROWN ON FETCH", error);
        AuthService.logout();
    //    setMessage("Failed to load dashboard. You have been logged out.");
        navigate("/"); // Redirect after logout
      });
  }, [navigate]); // Runs only on component mount

  const handleLogout = () => {
    AuthService.logout(); // Log out the user when the logout button is clicked
  };

return (
<main className="main-container d-flex">
      {/* Left Side */}
      <div className='left-side p-5'>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      
      {/* Right Side */}
      <div className="right-side p-5">
        <div className="task-container">
          <AddTaskButton onAddTask={() => console.log("Open add task modal")} />
          <TaskList initialTasks={tasks} />
        </div>
      </div>
    </main>
 ); 
};


export default DashPage;
