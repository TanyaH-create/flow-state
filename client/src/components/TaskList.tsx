//TaskList.tsx
import React, { useEffect, useState }  from 'react';
import TaskItem from './TaskItem'; // Import TaskItem component
import authService from "../utils/authService";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  stickerUrl?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

//TaskList now handles updating it's data. No longer passing props from DashPage
// interface TaskListProps {
//   tasks: Task[];
//   onToggleComplete: (taskId: number) => void; // Add onToggleComplete as a prop
// }


// const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
// MOve the isComplete action to TaskList so will reload the stickers on re-login

  const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
      const fetchTasks = async () => {
        const token = authService.getToken();
  
        try {
          const response = await fetch(`${API_BASE_URL}/api/tasks`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
  
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
  
      fetchTasks();
    }, []);
  
    const handleToggleComplete = async (taskId: number) => {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
  
      const newStatus = !task.isComplete;
      let stickerUrl = task.stickerUrl;
  
      // Fetch a sticker if marking as complete and no sticker exists
      if (newStatus && !stickerUrl) {
        try {
          console.log('GO FETCH THE STICKER')
          const response = await fetch(`${API_BASE_URL}/getSticker`);
          const data = await response.json();
          stickerUrl = data.stickerUrl;
        } catch (error) {
          console.error("Error fetching sticker:", error);
        }
      }
  
      const updatedTask = { 
        ...task, 
        isComplete: newStatus,
        stickerUrl: newStatus ? stickerUrl : null
      };
  
      const token = authService.getToken();
  
      try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTask),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update task");
        }
  
        // Update task state
        setTasks(prevTasks =>
          prevTasks.map(t => (t.id === taskId ? updatedTask as Task : t))   //map over previous task array to find the id
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };
   
  return (
    <div className="task-list border p-3 rounded">
       {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="list-group">
          {tasks.map(task => (
            <li key={task.id} className="list-group-item">
              <TaskItem task={task} onToggleComplete={handleToggleComplete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

// export default TaskList;