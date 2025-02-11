import React from "react";

interface AddTaskButtonProps {
  onAddTask: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onAddTask }) => {
  return (
    <button 
      className="bg-light text-dark border border-dark px-4 py-2 rounded-md hover:bg-gray-300"
      onClick={onAddTask}
    >
      + Add Task
    </button>
  );
};

export default AddTaskButton;