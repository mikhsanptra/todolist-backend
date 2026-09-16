import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Akses ditolak. Token tidak ditemukan!' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'pwf_2026';
    const decoded = jwt.verify(token, secret) as { id: number };
    res.locals.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Sesi tidak valid atau kadaluarsa!' });
    return;
  }
};