import { NextFunction, Request, Response } from "express";
import { ApiError } from "../entities/ApiError";
import { HttpStatusCode } from "../enums";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerToken = req.headers.authorization;
    const splitBearerToken = bearerToken?.split(" ");
    const token = splitBearerToken?.[1];

    if (!token) {
      throw new ApiError(HttpStatusCode.UNAUTHENTICATED, "Wrong Token Format");
    }

    const verifyToken: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    );

    if (!verifyToken) {
      throw new ApiError(HttpStatusCode.UNAUTHENTICATED, "Wrong Token");
    }

    //@ts-ignore
    req.userId = verifyToken.id;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
