import { Router } from 'express';
import { register, login, logout, profile, updateProfile } from '../controllers/authController';
import { isAuthenticated } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { registerSchema, loginSchema, updateProfileSchema } from '../validations/authValidator';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', isAuthenticated, logout);
router.get('/profile', isAuthenticated, profile);
router.put('/profile', isAuthenticated, validate(updateProfileSchema), updateProfile);

export default router;
