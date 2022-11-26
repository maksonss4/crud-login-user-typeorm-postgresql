import { User } from "../../entities/user.entity";
import { IUserCreate, IUserNoPassword } from "../../interfaces/users";
import AppDataSource from "../../database/data-source";

export async function createUserService(newUser: IUserCreate) {
  const { createdAt, email, isActive, isAdm, name, password, updatedAt } =
    newUser;
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.createdAt = createdAt;
  user.isActive = isActive;
  user.isAdm = isAdm;
  user.password = password;
  user.updatedAt = updatedAt;

  userRepository.create(user);
  await userRepository.save(user);

  const newUserNoPassword: IUserNoPassword = { ...user };
  delete newUserNoPassword.password;

  return newUserNoPassword;
}
