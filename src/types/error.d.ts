export interface ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
}


