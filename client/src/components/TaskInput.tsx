interface TaskInputProps {
  onAddTask: (name: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
        className="border p-2 flex-grow rounded-lg"
      />
      <button type="submit" className="ml-2 p-2 bg-green-500 text-white rounded">
        Add
      </button>
    </form>
  );
};

export default TaskInput;
