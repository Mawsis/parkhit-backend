import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { AuthenticationError } from "../utils/errors";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(new AuthenticationError("Unauthorized: Token not found"));
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (err) {
            return next(new AuthenticationError("Unauthorized: Invalid token"));
        }

        const user = await prisma.user.findFirst({
            where: { id: (decoded as any).userId },
        });

        if (!user) {
            return next(new AuthenticationError("Unauthorized: User not found"));
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
