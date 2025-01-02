import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { allParkings } from "../controllers/parkingController";

const router = Router()

router.get('/', isAuthenticated, allParkings);

export default router;