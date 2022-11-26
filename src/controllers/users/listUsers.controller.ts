import { Request, Response } from "express";
import { listUsersService } from "../../services/users/listUsers.service";

export async function listUsersController(req: Request, res: Response) {
  try {
    const users = await listUsersService();

    return res.send(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
}
