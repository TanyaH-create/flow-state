//DashPage.tsx
//DashPage fetches tasks from backend then passes 
//tasks down to TaskList as initialTasks.
//TaskList renders the tasks using TaskItem

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/authService.ts';
import TaskList from '../components/TaskList';
import AddTaskButton from '../components/AddTaskButton.tsx';
import NavBar from '../components/NavBar'; // Import NavBar
import AddTaskModal from '../components/AddTaskModal.tsx'; // Import Modal
import './DashPage.css';

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
  const [showModal, setShowModal] = useState<boolean>(false);
 
  useEffect(() => {
    // Check if the user is logged in (by checking token validity)
    if (!AuthService.loggedIn()) {
      navigate("/"); // Redirect to home if not logged in
      return;
    }
    console.log('User is logged in')
      // If logged in, fetch dashboard data
    const token = AuthService.getToken();
    
    fetch("/api/auth/dash", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks || []); // Set tasks (empty if no tasks)
      })
      .catch((error) => {
        console.log("Error:", error);
        AuthService.logout();
        navigate("/"); // Redirect to home on error
      });
  }, [navigate]);

  const handleAddTask = (title: string, description: string) => {
    const token = AuthService.getToken();
    console.log('add task raw token:', token)
    const decodedToken = AuthService.decodeToken(token);
    console.log('Decoded Token:', decodedToken);
    const userId = AuthService.decodeToken(token)?.id; // Decode the token to get the userId
    console.log('Handle Add Task Decoded Token:', userId)
       if (!userId) {
      console.log("No user ID found");
      return;
    }

    console.log('add task token:', token, 'userId:', userId);

    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, userId, isComplete: false }),
    })
      .then((response) => response.json())
      .then((newTask) => setTasks((prevTasks) => [...prevTasks, newTask]))
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleToggleComplete = (taskId: number) => {
    // Update task's isComplete status
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, isComplete: !task.isComplete }
          : task
      )
    );
  };

  return (
    <main className="container-fluid d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <NavBar />
            
      <div className="d-flex flex-grow-1 main-container">
        {/* Left Side */}
        <div className='left-side-dash'>
          <div className="badge-list-container">         
            <h2 className="h5">ADD BADGE SECTION ON THIS SIDE</h2>
         </div>
         </div>
        
         {/* Right Side */}
        <div className="right-side-dash">
            <div className="task-list-container">
              <div className="task-header-container">
                <AddTaskButton onAddTask={() => setShowModal(true)} />
                <h2 className="task-header">TASK LIST</h2>
              </div>
              <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} />
            </div>
        </div>
      </div>
      {/* Modal for Adding Task */}
      <AddTaskModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTask}
      />
    </main>
  ); 
};


export default DashPage;
