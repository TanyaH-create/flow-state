import { Router } from "express";
import apiRoutes from "./api/index.js";
//import middleware function to authenticate token


const router = Router();


// TODO: Add authentication to the API routes
//any routes that go through /api will require a valid token
//from the user in the authorization header. If authenticateToken is successfull, then
//apiRoutes will go through
//disable authenticate until after test login
//router.use('/api', authenticateToken, apiRoutes)
router.use("/api", apiRoutes);

export default router;
