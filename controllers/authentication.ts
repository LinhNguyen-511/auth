import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import bcrypt from "bcryptjs";
import Role from "../models/Role";
import RoleEnum from "../models/type/RoleEnum";
import { Schema } from "mongoose";

function signup(request: Request, response: Response): void {
  const { userName, email, password } = request.body;
  const user = new User({
    userName,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  user.save((error) => {
    if (error) {
      response.status(500).send({ message: error });
    }

    const roles = request.body.roles;

    if (roles) {
      assignRoles(roles, user, response);
    } else {
      assignRoles([RoleEnum.USER], user, response);
    }

    user.save((error) => {
      if (error) {
        response.status(500).send({ message: error });
      }

      response
        .status(201)
        .send({ message: "User was registered successfully!" });
    });
  });
}

function assignRoles(roles: RoleEnum[], user: IUser, response: Response): void {
  Role.find({ name: { $in: roles } }, (error, roles) => {
    if (error) {
      response.status(500).send({ message: error });
    }

    user.roles = roles.map((role) => role._id);
  });
}
