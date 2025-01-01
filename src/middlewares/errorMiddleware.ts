import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/error';
import { Prisma } from '@prisma/client';
import { ValidationError } from '../utils/errors'; // Import ValidationError
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error occurred: %o', {
    message: err.message,
    stack: err.stack,
    status: (err as ApiError).statusCode || 500,
  });
  // Handle ValidationError
  if (err instanceof ValidationError) {
    res.status(400).json({
      status: "error",
      errors: err.errors,
    });
    return
  }


  // Handle operational errors
  if ((err as ApiError).isOperational) {
    res.status((err as ApiError).statusCode).json({
      status: "error",
      message: err.message,
    });
    return
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaError(err, res);
    return
  }

  // Log unexpected errors and return generic response
  console.error("ERROR 💥", err);
  res.status(500).json({
    status: "error",
    message: "An unexpected error occurred",
  });
  return
};

// Prisma-specific error handler remains unchanged
const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError,
  res: Response
) => {
  switch (err.code) {
    case 'P2002':
      return res.status(409).json({
        status: 'error',
        message: 'A record with this data already exists',
      });
    case 'P2025':
      return res.status(404).json({
        status: 'error',
        message: 'Record not found',
      });
    default:
      return res.status(500).json({
        status: 'error',
        message: 'Database error occurred',
      });
  }
};
