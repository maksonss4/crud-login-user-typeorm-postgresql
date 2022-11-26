import { createUserService } from "../../services/users/createUser.service";
import { Request, Response } from "express";

export async function createUserController(req: Request, res: Response) {
  try {
    const { name, email, password, isAdm, createdAt, isActive, updatedAt } =
      req.validatedBody;
    const newUser = await createUserService({
      name,
      email,
      password,
      isAdm,
      createdAt,
      isActive,
      updatedAt,
    });

    return res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
}
