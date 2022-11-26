import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Missing authorization headers" });
    }

    const newToken = token.split(" ")[1];

    jwt.verify(
      newToken as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        req.user = { ...decoded.user };
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
