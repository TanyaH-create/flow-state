import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
console.log('User Controller Loaded')
console.log("User Model:", User);
console.log("User Methods:", User ? Object.keys(User) : "User is undefined");

// REGISTER a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log(`new user: ${email}  ${password}`)
  try {
    console.log('User=', User)
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database - initialize at a rank of zero
    const newUser = await User.create({
      email,
      password: hashedPassword,
      rank: 0,
    });

    // Generate JWT token
    const secretKey = process.env.JWT_SECRET_KEY!;
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// LOGIN an existing user
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    // Check password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
       res.status(401).json({ message: "Authentication failed" });
       return;
    }

    // Generate JWT token
    const secretKey = process.env.JWT_SECRET_KEY!;
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

