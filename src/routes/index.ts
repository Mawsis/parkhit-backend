import { Router } from "express";
import authRoutes from "./authRoutes";
import spotRoutes from "./spotsRoutes";
import adminRoutes from "./adminRoutes";
import parkingRoutes from "./parkingRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
import redisClient from "../config/redis";

const router = Router();

//Docs
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routes
router.use("/auth", authRoutes);
router.use("/spots", spotRoutes);
router.use("/parkings", parkingRoutes);


//Admin
router.use("/admin", adminRoutes);


router.get('/test-redis', async (req, res) => {
    try {
        await redisClient.set('test', 'Redis is working!');
        const value = await redisClient.get('test');
        res.status(200).send(`Redis says: ${value}`);
    } catch (error) {
        res.status(500).send('Redis test failed');
    }
});


export default router;
