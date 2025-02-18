//TaskItem.tsx

import React, { useState } from "react";
import AuthService from '../utils/authService.ts';
import { Card, Form } from 'react-bootstrap';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  stickerUrl?: string;  // Ensure the stickerUrl field is included
}


interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    stickerUrl?: string;
  };
  onToggleComplete: (taskId: number, updatedTask: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDeleteTask }) => {
  console.log('TaskItem rendering:', task);

  const [stickerUrl, setStickerUrl] = useState<string | null>(task.stickerUrl || null); // Local state for sticker URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  // Fetch sticker if the task is not complete
  const fetchSticker = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getSticker`);
      const data = await response.json();
      console.log('Sticker has been fetched:', data);
      setStickerUrl(data.stickerUrl); // Set the sticker URL to the local state
      return data;
    } catch (error) {
      console.error("Error fetching sticker:", error);
      setStickerUrl(null);
      return null;
    }
  };

  
  const handleToggleComplete = async () => {
    const token = AuthService.getToken();
    let updatedStickerUrl = stickerUrl;

    try {
      // If the task is not complete, fetch the sticker
      if (!task.isComplete && !task.stickerUrl) {
        console.log('Task has been toggled - fetch sticker');
        const data = await fetchSticker();
        if (data) {
          updatedStickerUrl = data.stickerUrl;  // Use the returned sticker URL
          console.log('TASK ITEM: Sticker has been fetched, updatedSticker:', updatedStickerUrl);
        }
      }

      const updatedTask = {
        ...task,
        isComplete: !task.isComplete,
        stickerUrl: updatedStickerUrl,
      };

      console.log('Making PUT request to:', `${API_BASE_URL}/api/tasks/${task.id}`);
      const response = await fetch(`${API_BASE_URL}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isComplete: updatedTask.isComplete,
          stickerUrl: updatedTask.stickerUrl,
        }),
      });

      console.log('Response Status:', response.status);
      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTaskFromServer = await response.json();
      console.log('TaskItem PUT updated task:', updatedTaskFromServer);

      // Pass the updated task back to the parent
      onToggleComplete(updatedTaskFromServer.id, updatedTaskFromServer);

    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    const token = AuthService.getToken();
    
    console.log('TASK ITEM: Making DELETE request to:', `${API_BASE_URL}/api/tasks/${task.id}`);
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        (console.log('handle delete response from server task.id:', task.id))
        onDeleteTask(task.id);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Card.Body className="custom-card-body p-3">
      <div className="mb-2">
        <h5 className={`text-lg font-weight-bold ${task.isComplete ? 'line-through text-muted' : ''}`}>
          {task.title}
        </h5>
        <p className="text-sm text-secondary">{task.description}</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Form.Check
          type="checkbox"
          label={task.isComplete ? "Completed" : "Mark Complete"}
          checked={task.isComplete}
          onChange={handleToggleComplete}
          className="custom-checkbox"
        />
        <button
          onClick={handleDelete}
          style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
        >
          Delete
        </button>
      </div>

      {task.isComplete && stickerUrl && (
        <div className="text-center mt-2">
          <img src={stickerUrl} alt="celebration sticker" className="w-75" />
          <small className="d-block mt-1 text-muted-xs">
            Powered by <a href="https://giphy.com" target="_blank" rel="noopener noreferrer" className="text-info">GIPHY</a>
          </small>
        </div>
      )}
    </Card.Body>
  );
};

export default TaskItem;
