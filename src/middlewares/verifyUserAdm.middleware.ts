import { Request, Response, NextFunction } from "express";

export function verifyUserAdmMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isAdm = req.user.isAdm;

  if (!isAdm) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
}
