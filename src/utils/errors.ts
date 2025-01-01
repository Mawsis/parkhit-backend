import { ApiError } from "../types/error";

export class AppError extends Error implements ApiError {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class ValidationError extends AppError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class AuthenticationError extends AppError {
    constructor(message: string) {
      super(message, 401);
    }
  }
  
  export class ForbiddenError extends AppError {
    constructor(message: string) {
      super(message, 403);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  