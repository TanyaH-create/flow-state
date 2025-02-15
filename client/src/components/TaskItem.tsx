import React, { useState } from "react";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
  };
  onToggleComplete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete }) => {

  const [stickerUrl, setStickerUrl] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  const fetchSticker = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getSticker`); // Your backend endpoint for fetching stickers
      const data = await response.json();
      setStickerUrl(data.stickerUrl); // Assuming the API returns the sticker URL in 'stickerUrl' field
    } catch (error) {
      console.error("Error fetching sticker:", error);
    }
  };

  const handleToggleComplete = async () => {
    const updatedTask = { ...task, isComplete: !task.isComplete };

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      onToggleComplete(task.id);


    if (!task.isComplete) {
      fetchSticker(); // Fetch a sticker when the task is marked as complete
    } else {
      setStickerUrl(null); // Optionally hide the sticker when the task is unmarked
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
  };

  return (
    <div className="border p-4 rounded-md shadow-md bg-light text-dark">
      {/* Title and Description in one div */}
      <div className="mb-2">
        <h3 className={`text-lg font-bold ${task.isComplete ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>

      {/* Checkbox and Sticker (gif) below, with gif to the right of checkbox */}
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
          <img src={stickerUrl} alt="celebration sticker" className="w-12 h-12 ml-4" />
        )}
      </div>
    </div>
  );
};

export default TaskItem;