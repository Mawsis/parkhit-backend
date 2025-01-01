import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "../utils/logger";

const globalMiddleware = (app: express.Application) => {
  app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
};

export default globalMiddleware;
