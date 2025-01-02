import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { SpotsService } from "../services/spotsService";
import { transform } from "../utils/transform";
import { spotsTransform } from "../transformers/spotsTransformer";

export const getAllParkingSpots = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const spots = await SpotsService.getSpotsOfParking(req.params.parking);

        res.status(200).json(transform(spots, spotsTransform));
    } catch (error) {
        next(error);
    }
};