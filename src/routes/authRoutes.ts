import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { isAuthenticated } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { registerSchema, loginSchema } from '../validations/authValidator';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, (req, res) => { res.json(req.user) });

export default router;
