import React from "react";

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
  return (
    <div className="border p-4 rounded-md shadow-md flex justify-between items-center bg-light text-dark">
      <div>
        <h3 className={`text-lg font-bold ${task.isComplete ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={() => onToggleComplete(task.id)}
          className="w-5 h-5"
        />
        <span>{task.isComplete ? "Completed" : "Mark Complete"}</span>
      </div>
    </div>
  );
};

export default TaskItem;
