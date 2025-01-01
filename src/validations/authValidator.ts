import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(3, 'Name should have at least 3 characters').max(30, 'Name should not exceed 30 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password should have at least 6 characters').nonempty('Password is required'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().nonempty('Password is required'),
});

