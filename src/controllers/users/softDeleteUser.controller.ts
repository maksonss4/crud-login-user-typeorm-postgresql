import { Request, Response } from "express";
import { User } from "../../entities/user.entity";
import { softDeleteUserService } from "../../services/users/softDeleteUser.service";

export async function softDeleteUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await softDeleteUserService(id);
    if (user instanceof User) {
      return res.status(204).json(user);
    }

    return res.status(user[1] as number).json({ message: user[0] });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(204).json({ error });
  }
}
