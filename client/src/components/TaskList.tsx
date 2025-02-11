import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import AddTaskButton from "./AddTaskButton";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

interface TaskListProps {
  initialTasks?: [];
}
  
const TaskList: React.FC<TaskListProps> = ({ initialTasks = []}) => {
  
  const [tasks, setTasks] = useState<Task[]>(initialTasks || []);

  useEffect(() => {
    fetch("/api/auth/dash")
      .then((res) => res.json())
      //.then((data) => setTasks(data.tasks))
      .then((data) => {
        console.log("Fetched tasks:", data.tasks);
        setTasks(Array.isArray(data.tasks) ? data.tasks : []); //check if tasks is undefined, if it is set to empty array
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };
  const taskData = tasks ||  [];
  return (
    <div className="space-y-4 bg-light text-dark p-4 rounded-md shadow-md">
      <AddTaskButton onAddTask={() => console.log("Open add task modal")} />
       {taskData.map((task) => (
        <TaskItem key={task.id} task={task} onToggleComplete={toggleTaskCompletion} />
      ))} 
    </div>
  );
};

export default TaskList;