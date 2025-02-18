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
import ProgressTracker from '../components/ProgressTracker.tsx';
import './DashPage.css';

const DashPage = () => {
  console.log('DashPage Renderinng');
  const [progress, setProgress] = useState(0);

  // TLH 2/11/25 - set up type
  interface Task {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    stickerUrl?: string;
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
        console.log('DashPage GET data:', data)
        setTasks(data.tasks || []); // Set tasks (empty if no tasks)
        setProgress(data.progress || 0); // Set progress (0 if no progress)
      })
      .catch((error) => {
        console.log("Error:", error);
        AuthService.logout();
        navigate("/"); // Redirect to home on error
      });
  }, [navigate]);

  const handleAddTask = (title: string, description: string) => {
    const token = AuthService.getToken();
 
    const userId = AuthService.decodeToken(token)?.id; // Decode the token to get the userId
  
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
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          const newIsComplete = !task.isComplete;
          return { ...task, isComplete: newIsComplete };
        }
        return task;
      });
  
      // Calculate new progress
      const completedCount = updatedTasks.filter((task) => task.isComplete).length;
      const newProgress = Math.min(completedCount * 20, 100);
      setProgress(newProgress);
  
      // Send update to backend
      const token = AuthService.getToken();
      fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ progress: newProgress }),
      }).catch((error) => console.error("Error updating progress:", error));
  
      return updatedTasks;
    });
  };

  return (
    <main className="container-fluid d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <NavBar />
            
      <div className="d-flex flex-grow-1 main-container">
        {/* Left Side */}
        <div className='left-side-dash'>
          <div className="badge-list-container">         
            <ProgressTracker progress={progress} />
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
