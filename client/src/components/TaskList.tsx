import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import AddTaskButton from "./AddTaskButton";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/auth/dash")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  return (
    <div className="space-y-4 bg-light text-dark p-4 rounded-md shadow-md">
      <AddTaskButton onAddTask={() => console.log("Open add task modal")} />
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleComplete={toggleTaskCompletion} />
      ))}
    </div>
  );
};

export default TaskList;