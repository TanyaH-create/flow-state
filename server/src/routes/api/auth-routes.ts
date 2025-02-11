import { Router, Request, Response } from "express";
import { Task } from "../../models/tasks.js";
import authenticateToken from "../../middleware/authMiddleware.js";

// Extend Express Request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

const router = Router();

// // GET api/auth/dash - Protected dashboard route
// router.get("/dash", authenticateToken, (req: AuthenticatedRequest, res: Response) => {
//   if (!req.user) {
//     console.log('Unsuccessful Token Authorization')
//     return res.status(403).json({ message: "Unauthorized access." });
//   }
//   console.log('Successful Token Authorization')
//   return res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });

  
// });

// GET /api/auth/dash - Fetch user tasks and progress
router.get("/dash", authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = (req as any).user.id; // Extract user ID from authenticated request
    
    // Fetch tasks for the logged-in user
    const tasks = await Task.findAll({ where: { userId } });
    
    // Calculate progress (each completed task = 20%)
    const completedTasks = tasks.filter(task => task.isComplete).length;
    const progress = Math.min(completedTasks * 20, 100); // Cap at 100%

    res.json({ tasks, progress });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error fetching dashboard data" });
  }
});

export default router;
