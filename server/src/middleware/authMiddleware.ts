// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); //load environment variables

// Extend Express Request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

 const authenticateToken = ( req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
  
   // Extract token from 'Bearer <token>' and trim spaces
  const token = req.header("Authorization")?.replace("Bearer", "").trim();

  //Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  //Verify Token
  try {
    const secretKey = process.env.JWT_SECRET_KEY!
    const decoded = jwt.verify(token, secretKey) as { id: number, email: string };
    req.user = decoded; //attach user info to the request
    next(); //proceed to next middleware
  } catch (err) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

export default authenticateToken;
