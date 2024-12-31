import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import prisma from "../config/prisma";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token" });
            return
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await prisma.user.findFirst({
            where: {
                id: (decoded as any).id
            }
        })

        if(!user){
            res.status(401).json({ message: "Unauthorized: User not found"})
            return 
        }

        req.user = user;
        next()
    } catch(error:any){
        res.status(401).json({message:"Unauthorized"})
    }
}