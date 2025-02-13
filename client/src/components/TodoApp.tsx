import React, { useState } from "react";
import TaskList from "./TaskList";

interface Task {
  id: number;
  name: string;
  level: number;
}

interface TaskItemProps {
  onAddTask: (name: string) => void;
}

const TaskInput: React.FC<TaskItemProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="border rounded p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (name: string) => {
    setTasks([...tasks, { id: Date.now(), name, level: 0 }]);
  };

  const levelUpTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, level: Math.min(50, task.level + 1) } : task
      )
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Flow-State</h2>
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} onLevelUp={levelUpTask} />
    </div>
  );
};

export default TodoApp;
