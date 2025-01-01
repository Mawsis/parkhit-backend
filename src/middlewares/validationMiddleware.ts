import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors';

export const validate = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err: any) {
            const errorMessages = err.errors.map((e: any) => {
                return e.message === "Required" ? `${e.path} is required` : e.message;
            });
            return next(new ValidationError(errorMessages));
        }
    };
};

