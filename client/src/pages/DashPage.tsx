import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/authService";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import ProgressBar from "../components/ProgressBar";
import LogoutButton from "../components/LogoutButton"; // Ensure this path is correct

interface Task {
  id: number;
  name: string;
  level: number;
}

const MAX_LEVEL = 50;
const XP_GAIN = 1.25;

const FlowState: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const addTask = (): void => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), name: newTask, level: 0 }]);
      setNewTask("");
    }
  };

  const updateLevel = (taskId: number): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, level: Math.min(MAX_LEVEL, task.level + XP_GAIN) }
          : task
      )
    );
  };

  const totalLevels = tasks.reduce((sum, task) => sum + task.level, 0);
  const maxPossibleLevels = tasks.length * MAX_LEVEL;
  const overallProgress = maxPossibleLevels > 0 ? (totalLevels / maxPossibleLevels) * 100 : 0;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Flow-State Dashboard</h2>
      <ProgressBar value={overallProgress} />
      <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      <TaskList tasks={tasks} updateLevel={updateLevel} />
      <LogoutButton />
    </div>
  );
};

export default FlowState;
