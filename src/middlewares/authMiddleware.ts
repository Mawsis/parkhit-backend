import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import prisma from "../config/prisma";
import { AuthenticationError } from "../utils/errors";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            throw new AuthenticationError("Unauthorized: token not found")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await prisma.user.findFirst({
            where: {
                id: (decoded as any).id
            }
        })

        if(!user){
            throw new AuthenticationError("Unauthorized: user not found")
        }

        req.user = user;
        next()
    } catch(error:any){
        throw new AuthenticationError("Unauthorized")
    }
}