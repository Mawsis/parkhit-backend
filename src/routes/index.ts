import { Router } from "express";
import authRoutes from "./authRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

const router = Router();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/auth", authRoutes);

export default router;
