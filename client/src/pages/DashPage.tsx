//DashPage.tsx

import { Container, Row, Col, Button } from "react-bootstrap"; // Import Button from React-Bootstrap
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/authService.ts";
import TaskList from "../components/TaskList.tsx";
//import AddTaskButton from '../components/AddTaskButton.tsx';
import NavBar from "../components/NavBar.tsx"; // Import NavBar
import AddTaskModal from "../components/AddTaskModal.tsx"; // Import Modal
import "./DashPage.css";

const DashPage = () => {
  console.log("DashPage is Renderinng");

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
    console.log("User is logged in");
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
        console.log("DashPage GET data:", data);
        setTasks(
          data.tasks.map((task: Task) => ({
            ...task,
            stickerUrl: task.stickerUrl || null, // Ensure sticker URL is included
          }))
        );
        // setTasks(data.tasks || []); // Set tasks (empty if no tasks)
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

    console.log("ADDING TASK: retrieving token:", token, "and userId:", userId);

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, userId, isComplete: false }),
    })
      .then((response) => {
        console.log("FETCH TASKS raw response:", response);
        return response.json();
      })
      .then((newTask) => {
        console.log("FETCH TASKS newTask::", newTask);
        setTasks((prevTasks) => [...prevTasks, newTask]);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleToggleComplete = (taskId: number, updatedTask: Task) => {
    // Update task's isComplete status
    console.log("DASH PAGE: Task list returned from TASK LIST:", updatedTask);
    console.log("IS COMPLETE TOGGLE BUTTON CLICKED");

    setTasks(
      (prevTasks) =>
        prevTasks.map((task) =>
          //task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
          task.id === taskId ? updatedTask : task
        ) // Closing parenthesis for map()
    );
  };

  const handleDeleteTask = (taskId: number) => {
    // Remove the task from the state
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks); // Update the state to trigger a re-render
  };



  return (
    <main className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <Container fluid className="mt-4">
        <Row className="justify-content-center">
          {/* Progress Bar Section */}
          <Col md={4} className="mb-3">
            <div className="d-flex flex-column align-items-center">
              <h2 className="progress-header">PROGRESS</h2>
              {/* Test Progress Bar */}
            </div>
          </Col>

          {/* Task List Section */}
          <Col md={8}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="task-header">TASK LIST</h2>
              <Button onClick={() => setShowModal(true)} variant="secondary">
                Add Task
              </Button>
            </div>
            <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} onDeleteTask={handleDeleteTask}/>
          </Col>
        </Row>
      </Container>

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
