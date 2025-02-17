// TaskList.tsx
import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem'; // Import TaskItem component

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  stickerUrl?: string;  // Ensure the stickerUrl field is included
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number, updatedTask: Task) => void;  // Updated to accept updatedTask as a second argument
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  useEffect(() => {
    setTaskList(tasks);  // Keep the task list updated with the parent state
  }, [tasks]);

  // Function to handle task completion toggle
  const handleToggleComplete = (taskId: number, updatedTask: Task) => {
    // Update task list state to trigger a re-render
    const updatedTasks = taskList.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    setTaskList(updatedTasks);
    onToggleComplete(taskId, updatedTask);  // Pass the updated task back to the parent
  };

  const handleDeleteTask = (taskId: number) => {
    // Update task list state to trigger a re-render
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
  };

  return (
    <div className="task-list border p-3 rounded">
      {taskList.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="list-group">
          {taskList.map((task) => (
            <li key={task.id} className="list-group-item">
              <TaskItem task={task} 
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask} 
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
