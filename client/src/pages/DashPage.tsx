//DashPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/authService.ts';
import TaskList from '../components/TaskList';
import AddTaskButton from '../components/AddTaskButton.tsx';
import NavBar from '../components/NavBar'; // Import NavBar

const DashPage = () => {
  console.log('DashPage Renderinng')  

  // TLH 2/11/25 - set up type
  interface Task {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
  }
  
  
  const navigate = useNavigate(); // to navigate programmatically
  // TLH 2/11/25 - add type Task
  const [tasks, setTasks] = useState<Task[]>([]);
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
        if (response.ok) return response.json();
        console.log('DashPage authenticate error')
        throw new Error("Access Denied");
      })
      .then((data) => {
        console.log('Fetched Data:', data);
        setTasks(data.tasks || []); // Store fetched tasks
      })
      .catch((error) => {
        console.log("DashPAge catch error", error);
        AuthService.logout();
    //    setMessage("Failed to load dashboard. You have been logged out.");
        navigate("/"); // Redirect after logout
      });
  }, [navigate]); // Runs only on component mount



  return (
    <main className="container-fluid d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <NavBar />
            
      <div className="d-flex flex-grow-1">
        {/* Left Side */}
        <div className='left-side p-5 w-50'>
          <h2 className="h5">ADD BADGE SECTION ON THIS SIDE</h2>
        </div>
        
        {/* Right Side */}
        <div className="right-side p-5 w-50">
          <div className="task-container">
            <AddTaskButton onAddTask={() => console.log("Open add task modal")} />
            <TaskList initialTasks={tasks} />
          </div>
        </div>
      </div>
    </main>
  ); 
};


export default DashPage;
