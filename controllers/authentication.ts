import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import bcrypt from "bcryptjs";
import { Role, IRole } from "../models/Role";
import RoleEnum from "../models/type/RoleEnum";
import { secret } from "../auth.config";
import jwt from "jsonwebtoken";

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
      return;
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
        return;
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
      return;
    }

    user.roles = roles.map((role) => role._id);
  });
}

function signin(request: Request, response: Response) {
  const { userName, email } = request.body;

  User.findOne({ $or: [{ userName }, { email }] })
    .populate<{ roles: IRole[] }>("roles")
    .exec((error, user) => {
      if (error) {
        response.status(500).send({ message: error });
        return;
      }

      const isPasswordValid = bcrypt.compareSync(
        user.password,
        request.body.password
      );

      if (!isPasswordValid) {
        response.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
        return;
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      const roles = user.roles.map((role) => role.name);

      response.status(200).send({
        id: user._id,
        token,
        userName: user.userName,
        email: user.email,
        roles,
      });
    });
}
