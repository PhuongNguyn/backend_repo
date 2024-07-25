import { HttpStatusCode } from "../enums";

export class ApiError extends Error {
  public statusCode: HttpStatusCode;

  constructor(statusCode: HttpStatusCode, message = "Something Went Wrong!") {
    super(message);
    this.statusCode = statusCode;
  }
}
