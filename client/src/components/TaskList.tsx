// TaskList.tsx
import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem'; // Import TaskItem component
import { Container, Row, Col, Card } from 'react-bootstrap';


interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  stickerUrl?: string;  // Ensure the stickerUrl field is included
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number, updatedTask: Task) => void;  // Updated to accept updatedTask as a second argument
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  useEffect(() => {
    setTaskList(tasks);  // Keep the task list updated with the parent state
  }, [tasks]);

  // // Function to handle task completion toggle
  // const handleToggleComplete = (taskId: number, updatedTask: Task) => {
  //   // Update task list state to trigger a re-render
  //   const updatedTasks = taskList.map((task) =>
  //     task.id === taskId ? updatedTask : task
  //   );
  //   setTaskList(updatedTasks);
  //   onToggleComplete(taskId, updatedTask);  // Pass the updated task back to the parent
  // };

  return (
    <Container className="task-list-container mt-4 w-100 h-auto">
      {taskList.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <Row>
          {taskList.map((task) => (
            <Col key={task.id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm">
                <TaskItem task={task} onToggleComplete={onToggleComplete} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TaskList;
