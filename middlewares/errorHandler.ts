import { NextFunction, Request, Response } from "express";
import { ApiError } from "../entities/ApiError";

export const errorHandlers = (
  errors: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(errors.statusCode || 500).json({
    statusCode: errors?.statusCode || 500,
    message: errors?.message || "Some thing went wrong",
  });
};
