import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/database";
import { notFound } from "./middlewares/NotFoundMiddleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes";
// import parkingRoutes from "./routes/parkingRoutes";

app.use("/auth", authRoutes);
// app.use("/parking", parkingRoutes);

app.use(notFound);
// Database connection
sequelize.sync().then(() => {
  console.log("Database synced successfully");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
