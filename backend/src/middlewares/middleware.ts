import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";


export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");

  if (!token) {
     res.status(401).json({ message: "No token, authorization denied" });
     return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
    console.log("✅ Authenticated User:", req.user);
    next();
  } catch (error) {
     res.status(401).json({ message: "Invalid token" });
  }
};
