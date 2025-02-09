import { Router, Request, Response } from "express";
import authenticateToken from "../../middleware/authMiddleware.js";

// Extend Express Request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

const router = Router();

// GET api/auth/dash - Protected dashboard route
router.get("/dash", authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    console.log('Unsuccessful Token Authorization')
    return res.status(403).json({ message: "Unauthorized access." });
  }
  console.log('Successful Token Authorization')
  return res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });

  
});

export default router;
