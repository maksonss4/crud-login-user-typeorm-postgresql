import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginUserService({ email, password }: IUserLogin) {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const userFind = users.find((user) => user.email === email);

  if (!userFind) {
    throw new Error("Wrong email/password");
  }

  if (!bcrypt.compareSync(password, userFind!.password)) {
    throw new Error("Wrong email/password");
  }

  const token = jwt.sign(
    {
      user: {
        isAdm: userFind.isAdm,
        id: userFind.id,
      },
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "1d",
    }
  );

  return token;
}
