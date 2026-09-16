// src/models/todoModel.ts
import pool from "../config/db.js";

export const TodoModel = {
  getAll: async (userId: number) => {
    const [rows]: any = await pool.query(
      `SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC`,
      [userId]
    );

    return rows;
  },

  getById: async (id: number, userId: number) => {
    const [rows]: any = await pool.query(
      `SELECT * FROM todos WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    return rows;
  },

  create: async (
    userId: number,
    title: string,
    description: string | null = null,
    status: string = "pending"
  ) => {
    const [result]: any = await pool.query(
      `INSERT INTO todos (user_id, title, description, status)
       VALUES (?, ?, ?, ?)`,
      [userId, title, description, status]
    );

    return result;
  },

  update: async (
    id: number,
    userId: number,
    title: string,
    description: string | null = null,
    status: string = "pending"
  ) => {
    const [result]: any = await pool.query(
      `UPDATE todos
       SET title = ?, description = ?, status = ?
       WHERE id = ? AND user_id = ?`,
      [title, description, status, id, userId]
    );

    return result;
  },

  delete: async (id: number, userId: number) => {
    const [result]: any = await pool.query(
      `DELETE FROM todos
       WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    return result;
  }
};