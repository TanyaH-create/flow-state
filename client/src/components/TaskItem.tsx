//TaskItem.tsx

import React, { useState } from "react";
import AuthService from '../utils/authService.ts';

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
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete }) => {
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

  return (
    <div className="border p-4 rounded-md shadow-md bg-light text-dark">
      <div className="mb-2">
        <h3 className={`text-lg font-bold ${task.isComplete ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-2">
          <span>{task.isComplete ? "Completed" : "Mark Complete"}</span>
          <input
            type="checkbox"
            checked={task.isComplete}
            onChange={handleToggleComplete}
            className="w-5 h-5"
          />
        </div>
        {task.isComplete && stickerUrl && (
          <div className="flex flex-col items-center">
             <img src={stickerUrl} alt="celebration sticker" className="w-12 h-12" />
             <span className="text-xs text-gray-500 mt-1 text-center">Powered by <a href="https://giphy.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">GIPHY</a></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
