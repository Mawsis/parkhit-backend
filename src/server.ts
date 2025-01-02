import express from "express";
import dotenv from "dotenv";
import { notFound } from "./middlewares/notFoundMiddleware";
import globalMiddleware from "./middlewares/globalMiddleware";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorMiddleware";
import { User } from "@prisma/client";


dotenv.config();

export const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

globalMiddleware(app);
app.use("/", routes);
app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}