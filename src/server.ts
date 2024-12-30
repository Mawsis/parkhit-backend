import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/database";

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

// Database connection
sequelize.sync().then(() => {
  console.log("Database synced successfully");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
