import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { getAllParkingSpots } from "../controllers/spotsController";


const router = Router();

router.get("/:parking", isAuthenticated, getAllParkingSpots);

export default router;