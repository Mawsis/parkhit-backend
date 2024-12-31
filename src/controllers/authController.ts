import { Request, Response } from 'express';
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { clearToken, generateToken } from '../utils/jwt';

//authenticating with jwt token and cookie
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findFirst(
        {
          where:{email}
        }
        );
        console.log(user);
        
        if (!user) {
          res.status(404).json({ message: "User not found" });
        return 
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(400).json({ message: "Invalid password" });
          return 
        }
        generateToken(res, user.id);
        res.status(201).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

//registering user
export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user) {
          res.status(400).json({ message: "User already exists" });
          return
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role,
          }})
        if (newUser) {
          generateToken(res, newUser.id);
          res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          });
        } else {
          res.status(400).json({ message: "An error occurred in creating the user" });
        }
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

//logging out user
export const logout = async (req: Request, res: Response) => {
    clearToken(res);
    res.status(200).json({ message: "Logout successful" });
}
