import { Request, Response, Router } from "express";
import { register, login, logout } from "../controllers/authController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",isAuthenticated, logout);
router.get("/me", isAuthenticated, (req: Request, res: Response) => {
    res.json(req.user);
    });

export default router;
