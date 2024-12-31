import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const globalMiddleware = (app: express.Application) => {
  app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

export default globalMiddleware;
