import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

jest.mock('../config/prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

const prismaMock = require('../config/prisma').default as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    mockReset(prismaMock);
});

export default prismaMock;
