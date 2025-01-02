import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { clearToken, generateToken } from "../utils/jwt";
import {
  AuthenticationError,
  NotFoundError,
  ValidationError,
} from "../utils/errors";
import { transform } from "../utils/transform";
import { userTransform } from "../transformers/userTransform";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid password");
    }

    generateToken(res, user.id);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;



    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CLIENT",
      },
    });

    generateToken(res, newUser.id);
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    clearToken(res);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(transform(req.user, userTransform));
  } catch (error) {
    next(error);
  }
}

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    //update user
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: { name, email },
    });

    console.log(updatedUser);


    res.status(200).json(transform(updatedUser, userTransform));
  } catch (error) {
    next(error);
  }
}
