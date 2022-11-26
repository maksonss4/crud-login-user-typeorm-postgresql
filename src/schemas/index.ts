import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserCreate, IUserUpdate } from "../interfaces/users";
import bcrypt from "bcrypt";

export const userCreateScheama: SchemaOf<IUserCreate> = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    }),
  isAdm: yup.boolean().required(),
  name: yup.string().required(),
  password: yup
    .string()
    .required()
    .transform((value, originalValue) => {
      return bcrypt.hashSync(originalValue, 10);
    }),
  createdAt: yup
    .date()
    .transform(() => new Date())
    .default(() => new Date()),
  updatedAt: yup
    .date()
    .transform(() => new Date())
    .default(() => new Date()),
  isActive: yup
    .boolean()
    .transform(() => true)
    .default(() => true),
});

export const userUpdateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup
    .string()
    .email()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    }),
  name: yup.string(),
  password: yup.string().transform((value, originalValue) => {
    return bcrypt.hashSync(originalValue, 10);
  }),
  updatedAt: yup
    .date()
    .transform(() => new Date())
    .default(() => new Date()),
});
