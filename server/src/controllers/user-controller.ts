import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();


// REGISTER a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    
    // Create the user in the database - initialize at a rank of zero
    const newUser = await User.create({
      email,
      password,     
      rank: 0,
    });


    res.status(201).json({ user: newUser });
  } catch (error) {
     res.status(500).json({ message: "Error creating user" });
  }
};

// LOGIN an existing user
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log(`Trying to Login in: ${email} ${password}`)
  try {
    const user = await User.findOne({ where: { email } });
    console.log('trying to find user', user)
    if (!user) {
      res.status(401).json({ message: "Authentication failed - no user" });
      return;
    }

    // Check password
     const passwordIsValid = await bcrypt.compare(password.trim(), user.password);
     if (!passwordIsValid) {
       res.status(401).json({ message: "Authentication failed - not valid" });
       return;
    }

    // Generate JWT token
    const secretKey = process.env.JWT_SECRET_KEY!;
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ token }); // Send token to the client
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

// GET /users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      //attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.email = email;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
