import request from 'supertest';
import { app } from '../server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prismaMock from './setup';
import { UserRole } from '@prisma/client';

describe('Auth Controller', () => {
    describe('POST /auth/login', () => {
        it('should return 400 if email or password is missing', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({ email: '' });

            expect(response.status).toBe(400);
            expect(response.body.errors).toContain('password is required');
        });

        it('should return 404 if user is not found', async () => {
            prismaMock.user.findFirst.mockResolvedValue(null);

            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'test@example.com', password: 'password' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });

        it('should return 401 if password is incorrect', async () => {
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                password: await bcrypt.hash('correct_password', 10),
                name: 'Test User',
                role: UserRole.CLIENT,
            };

            prismaMock.user.findFirst.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'test@example.com', password: 'wrong_password' });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid password');
        });

        it('should return 200 and a token if credentials are correct', async () => {
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                password: await bcrypt.hash('correct_password', 10),
                name: 'Test User',
                role: UserRole.CLIENT,
            };

            prismaMock.user.findFirst.mockResolvedValue(mockUser);
            const jwtSignSpy = jest.spyOn(jwt, 'sign');

            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'test@example.com', password: 'correct_password' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(jwtSignSpy).toHaveBeenCalledWith(
                { userId: '1' },
                expect.any(String),
                { expiresIn: '24h' }
            );
        });
        it('should return 400 for missing email or password', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({ email: '' });

            expect(response.status).toBe(400);
            expect(response.body.errors).toContain('Invalid email format');
            expect(response.body.errors).toContain('password is required');
        });

        it('should return 400 for invalid email format', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'invalid-email', password: '123456' });

            expect(response.status).toBe(400);
            expect(response.body.errors).toContain('Invalid email format');
        });

    });
});
