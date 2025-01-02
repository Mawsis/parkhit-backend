import { NextFunction, Request, Response } from "express";
import redisClient from "../config/redis";

export const cacheMiddleware = (
    keyGenerator: (req: Request) => string
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cacheKey = keyGenerator(req);

    try {
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            res.json(JSON.parse(cachedData));
            return;
        }

        // Wrap the original res.json method
        const originalJson = res.json.bind(res);

        res.json = (body: any): Response => {
            redisClient
                .setEx(cacheKey, 3600, JSON.stringify(body))
                .catch((err) => console.error("Redis Set Error:", err));
            return originalJson(body);
        };

        next();
    } catch (error) {
        console.error("Redis Middleware Error:", error);
        next(error); // Pass error to global error handler
    }
};
