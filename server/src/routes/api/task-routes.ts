// src/routes/api/task-routes.ts
import express from 'express';
import { Task } from '../../models/tasks';
import authMiddleware from '../../middleware/authMiddleware';
import '../../types/express'; // Import the extended Request type

const router = express.Router();

// Get all tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ userId: req.user.id, title, description, isComplete: false });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

export default router;