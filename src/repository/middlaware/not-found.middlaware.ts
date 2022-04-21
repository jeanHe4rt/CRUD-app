import { NOTFOUND } from "dns";
import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = "Resource not Found";

  response.status(404).send(message);
};
