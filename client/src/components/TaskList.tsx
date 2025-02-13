import React from "react";
import Task from "./Task";

interface TaskListProps {
  tasks: { id: number; name: string; level: number }[];
  onLevelUp: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onLevelUp }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Add one!</p>
      ) : (
        tasks.map((task) => <Task key={task.id} task={task} onLevelUp={onLevelUp} />)
      )}
    </div>
  );
};

export default TaskList;
