// src/controllers/todoController.ts
import { Request, Response } from "express";
import { TodoModel } from "../models/todoModel.js";

export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId;
    const todos: any = await TodoModel.getAll(userId);
    res.json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = res.locals.userId;
    const { title, description, status } = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        message: "Title wajib diisi"
      });
      return;
    }

    const result: any = await TodoModel.create(
      userId,
      title,
      description || null,
      status || "pending"
    );

    res.status(201).json({
      success: true,
      message: "Todo berhasil dibuat",
      id: result.insertId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server"
    });
  }
};
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    const todos: any = await TodoModel.getById(id, userId);

    if (todos.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan"
      });
      return;
    }

    res.json({ success: true, data: todos[0] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server"
    });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    const { title, description, status } = req.body;

    if (!title || !status) {
      res.status(400).json({
        success: false,
        message: "Title dan status wajib diisi"
      });
      return;
    }

    const result: any = await TodoModel.update(
      id,
      userId,
      title,
      description || null,
      status
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan"
      });
      return;
    }

    res.json({
      success: true,
      message: "Todo berhasil diperbarui"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server"
    });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = res.locals.userId;

    const result: any = await TodoModel.delete(id, userId);

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan"
      });
      return;
    }

    res.json({
      success: true,
      message: "Todo berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server"
    });
  }
};