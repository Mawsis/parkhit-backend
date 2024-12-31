import express from "express";
import dotenv from "dotenv";
import prisma from "./config/prisma";
import { notFound } from "./middlewares/NotFoundMiddleware";
import globalMiddleware from "./middlewares/globalMiddleware";
import routes from "./routes";

dotenv.config(); // Load environment variables

// Initialize Express app
const app = express();

// Extend Express Request to include user info globally
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
      } | null;
    }
  }
}

// Apply Global Middleware
globalMiddleware(app);

// Register Routes
app.use("/", routes);

// Handle 404 Not Found
app.use(notFound);

// Database Connection
prisma
  .$connect()
  .then(() => console.log("Database connected"))
  .catch((error: any) => console.error("Database connection error:", error));

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
