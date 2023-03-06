import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { secret } from "../auth.config";
import { User } from "../models/User";
import RoleEnum from "../models/type/RoleEnum";

function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const tokenHeader = "x-access-token";
  const token = request.headers[tokenHeader];

  if (!token) {
    response.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token as string, secret, (error, decoded) => {
    if (error) {
      response.status(401).json({ message: "Unauthorized" });
    }

    request.body.userId = decoded.id;
    next();
  });
}

function verifyAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { userId } = request.body;

  User.findOne({ _id: userId }, (error, user) => {
    if (error) {
      response.status(500).json({ message: error });
    }

    if (!user) {
      response.status(404).json({ message: "User not found" });
    }

    const isUserAdmin = user.roles.includes(RoleEnum.ADMIN);

    if (!isUserAdmin) {
      response.status(403).json({ message: "Require Admin Role" });
    }

    next();
  });
}

export { verifyToken, verifyAdmin };
