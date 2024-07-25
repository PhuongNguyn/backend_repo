import { Request } from "express";
import { IUser } from "./user";

export type ResponseData<T> = {
  message: string;
  data: T;
};
export type UserWithoutPassword = Omit<IUser, "password">;

export interface AuthRequest extends Request {
  userId: string;
}
