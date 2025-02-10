import express from 'express';
import { User } from '../../models/user';
import authMiddleware from '../../middleware/authMiddleware';

const router = express.Router();

// Get user progress (rank)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ rank: user.rank });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user progress' });
  }
});

export default router;
