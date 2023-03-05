import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import RoleEnum from "../models/type/RoleEnum";

function verifyCredentials(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { userName, email } = request.body;

  User.findOne({ $or: [{ userName }, { email }] }).exec((error, user) => {
    if (error) {
      response.status(500).send({ message: error });
    } else if (user) {
      response
        .status(400)
        .send({ message: "Username or email is already in use" });
    } else {
      next();
    }
  });
}

function verifyRoles(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { roles } = request.body;
  const areRolesValid = roles.every((role: string) => RoleEnum[role]);

  if (!areRolesValid) {
    response.status(400).send({ message: "Invalid role(s)" });
  } else {
    next();
  }
}

export { verifyCredentials, verifyRoles };
