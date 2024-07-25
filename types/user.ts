import { Role } from "../enums";

export interface IUser {
  id: string;
  username: string;
  password: string;
  role: Role;
}
