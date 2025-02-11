//user-routes.js
import authenticateToken from '../../middleware/authMiddleware.js';

import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';


const router = express.Router();


// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/:id', getUserById);


// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

// Protect the /dash route with authentication middleware
router.get('/dash', authenticateToken, (_req, res) => {
  // Once the token is verified, this route is accessible
  res.status(200).json({ message: "Welcome to the Dashboard!" });
});


export default router;
