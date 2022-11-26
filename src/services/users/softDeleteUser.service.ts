import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";

export async function softDeleteUserService(id: string) {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    return ["User not found", 404];
  }

  if (!findUser.isActive) {
    return ["Inactive user ", 400];
  }

  await userRepository.update(id, { isActive: false, updatedAt: new Date() });

  const user = userRepository.findAndCountBy({ id });

  return user;
}
