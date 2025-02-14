//TaskList.tsx
import React from 'react';
import TaskItem from './TaskItem'; // Import TaskItem component

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void; // Add onToggleComplete as a prop
}



const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  return (
    <div className="task-list border p-3 rounded">
       {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="list-group">
          {tasks.map(task => (
            <li key={task.id} className="list-group-item">
              <TaskItem task={task} onToggleComplete={onToggleComplete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

// export default TaskList;