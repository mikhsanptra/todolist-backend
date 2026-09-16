// src/middlewares/validator.ts
import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Username, email, dan password wajib diisi!"
    });
    return;
  }
  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: "Username dan password wajib diisi!"
    });
    return;
  }
  next();
};

export const validateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({
      success: false,
      message: "Title wajib diisi!"
    });
    return;
  }
  next();
};

export const validateUpdateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, status } = req.body;

  if (!title || !status) {
    res.status(400).json({
      success: false,
      message: "Title dan status wajib diisi!"
    });
    return;
  }

  const allowedStatus = ["pending", "completed"];

  if (!allowedStatus.includes(status)) {
    res.status(400).json({
      success: false,
      message: "Status harus pending atau completed!"
    });
    return;
  }

  next();
};