import { Request, Response } from "express";
import prisma from "../config/prisma";
import { transform } from "../utils/transform";
import { parkingTransform } from "../transformers/parkingTransform";

export const allParkings = async (req: Request, res: Response) => {
    const parkings = await prisma.parking.findMany(
        {
            include: {
                spots: true,
            },
        }
    );

    res.status(200).json(transform(parkings, parkingTransform));
}