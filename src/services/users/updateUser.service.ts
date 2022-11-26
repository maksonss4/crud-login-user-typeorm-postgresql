import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";

export async function updateUserService(id_params: string, data: IUserUpdate) {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: id_params });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  await userRepository.update(user!.id, { ...data });

  return "User update";
}
