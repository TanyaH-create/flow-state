//task-controller

import { Request, Response } from "express";
import { Task } from "../models/tasks.js"; // Import the Task model

// Handler for creating a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    console.log('CREATING TASK')
    const { title, description, userId} = req.body; // Extract data from request body
    console.log(title, description )
    

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Create a new task in the database
    const newTask = await Task.create({ 
      title, 
      description, 
      userId, 
      isComplete: false // Default the task to not complete
    });

    // Respond with the created task
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isComplete, stickerUrl } = req.body;
    console.log('Update Task', isComplete, id)

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isComplete = isComplete;
    
    //store sticker so t hat of logout the back in the sticer will appear
    if (isComplete && stickerUrl) {
      task.stickerUrl = stickerUrl; // Store the sticker URL
    } else if (!isComplete) {
      task.stickerUrl = ''; // Remove sticker if task is marked incomplete
    }

    await task.save();



    return res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Error updating task" });
  }
};


// GET /tasks
export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      //attributes: { exclude: ['password'] }
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

