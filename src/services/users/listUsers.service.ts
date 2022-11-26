import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";
import { IUserNoPassword } from "../../interfaces/users";

export async function listUsersService() {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const usersNoPassword = users.map((user) => {
    const userNoPassword: IUserNoPassword = { ...user };
    delete userNoPassword.password;

    return userNoPassword;
  });

  return usersNoPassword;
}
