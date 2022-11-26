import { Request, Response, NextFunction } from "express";

export function authorizationUpdateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id: id_params } = req.params;
  const { id: id_token, isAdm: isAdm_token } = req.user;

  if (isAdm_token || id_params === id_token) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}
