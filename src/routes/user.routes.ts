import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { listUsersController } from "../controllers/users/listUsers.controller";
import { loginUserController } from "../controllers/users/loginUser.controller";
import { softDeleteUserController } from "../controllers/users/softDeleteUser.controller";
import { updateUserController } from "../controllers/users/updateUserController";
import { authorizationUpdateMiddleware } from "../middlewares/authorizationUpdate.middleware";
import { validateSerializerMiddleware } from "../middlewares/validateSerializer.middleware";
import { authUserMiddleware } from "../middlewares/verifyAuthToken.middleware";
import { verifyUserAdmMiddleware } from "../middlewares/verifyUserAdm.middleware";
import { userCreateScheama, userUpdateSchema } from "../schemas";

export const routes = Router();

routes.post(
  "/users",
  validateSerializerMiddleware(userCreateScheama),
  createUserController
);
routes.post("/login", loginUserController);
routes.get(
  "/users",
  authUserMiddleware,
  verifyUserAdmMiddleware,
  listUsersController
);
routes.patch(
  "/users/:id",
  authUserMiddleware,
  authorizationUpdateMiddleware,
  validateSerializerMiddleware(userUpdateSchema),
  updateUserController
);
routes.delete(
  "/users/:id",
  authUserMiddleware,
  verifyUserAdmMiddleware,
  softDeleteUserController
);
