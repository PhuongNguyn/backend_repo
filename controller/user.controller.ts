import { NextFunction, Request, Response } from "express";
import { ApiError } from "../entities/ApiError";
import { HttpStatusCode } from "../enums";
import {
  authentication,
  getListUser,
  getUserDetail,
  updateUser,
} from "../services/user.service";
import { APISucess } from "../entities/ApiSuccess";
import { IUser } from "../types/user";
import { AuthRequest, UserWithoutPassword } from "../types";

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body?.username) {
      throw new ApiError(HttpStatusCode.BAD_REQUEST, "Usernane is required");
    }
    //@ts-ignore
    const docId = req.userId;
    if (req.body.password) {
      delete req.body.password;
    }
    if (!docId) {
      throw new ApiError(HttpStatusCode.BAD_REQUEST, "Missing user id");
    }
    const update = await updateUser(docId, req.body);

    const responseData = new APISucess<UserWithoutPassword>(
      update,
      "Update User Success"
    );

    return res.status(HttpStatusCode.OK).json(responseData.formatResponse());
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const docId = req.userId;
    const data = await getUserDetail(docId);
    const responseData = new APISucess(data, "Get List User Success");

    return res.status(HttpStatusCode.OK).json(responseData.formatResponse());
  } catch (error) {}
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getListUser();

    const responseData = new APISucess<UserWithoutPassword[]>(
      data,
      "Get List User Success"
    );

    return res.status(HttpStatusCode.OK).json(responseData.formatResponse());
  } catch (error: Error | any) {
    const err = new ApiError(
      error.statusCode || HttpStatusCode.INTERNAL_SERVER,
      error.message
    );
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Missing username or password"
      );
    }

    const result = await authentication(username, password);

    const responseData = new APISucess<{
      user: UserWithoutPassword;
      token: string;
    }>(result, "Get List User Success");

    return res.status(HttpStatusCode.OK).json(responseData.formatResponse());
  } catch (error: Error | any) {
    const err = new ApiError(
      error.statusCode || HttpStatusCode.INTERNAL_SERVER,
      error.message
    );
    next(err);
  }
};
