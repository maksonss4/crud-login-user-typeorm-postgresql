import * as express from "express";
import { IUserCreate } from "../../interfaces/users";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        isAdm: boolean;
      };
      validatedBody: any;
    }
  }
}
