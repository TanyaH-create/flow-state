//routes/index.ts
import { Router } from "express";
import apiRoutes from "./api/index.js";
//import middleware function to authenticate token


const router = Router();

//router.use('/api', authenticateToken, apiRoutes)
router.use("/api", apiRoutes);

export default router;
