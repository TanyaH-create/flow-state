import React from "react";

interface ProgressProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-300 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

interface TaskProps {
  task: { id: number; name: string; level: number };
  onLevelUp: (id: number) => void;
}

const BADGES: Record<number, string> = {
  10: "🥉 Bronze",
  20: "🥈 Silver",
  30: "🥇 Gold",
  40: "💎 Platinum",
  50: "💠 Diamond",
};

const Task: React.FC<TaskProps> = ({ task, onLevelUp }) => {
  const badge = BADGES[task.level] || null;

  return (
    <div className="p-4 border rounded-lg shadow mb-2">
      <div className="flex justify-between items-center">
        <span className="font-bold">{task.name} (Lvl {task.level})</span>
        <button
          onClick={() => onLevelUp(task.id)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          +
        </button>
      </div>
      <ProgressBar progress={(task.level / 50) * 100} />
      {badge && <div className="mt-2 text-green-600 font-semibold">{badge}</div>}
    </div>
  );
};

export default Task;
