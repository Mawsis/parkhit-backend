import { Router } from "express";
import authRoutes from "./authRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
import redisClient from "../config/redis";

const router = Router();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/auth", authRoutes);



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
