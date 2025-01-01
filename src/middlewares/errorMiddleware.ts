import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/error';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaError(err, res);
    return
  }

  if ((err as ApiError).isOperational) {
    res.status((err as ApiError).statusCode).json({
      status: 'error',
      message: err.message
    });
    return
  }

  console.error('ERROR 💥', err);

  res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
    return 
};

const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError,
  res: Response
) => {
  switch (err.code) {
    case 'P2002':
      return res.status(409).json({
        status: 'error',
        message: 'A record with this data already exists'
      });
    case 'P2025':
      return res.status(404).json({
        status: 'error',
        message: 'Record not found'
      });
    default:
      return res.status(500).json({
        status: 'error',
        message: 'Database error occurred'
      });
  }
};
