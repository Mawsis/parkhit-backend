module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/prismaMock.ts'],
    testMatch: ['**/*.test.ts'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.d.ts',
      '!src/test/**/*.ts',
    ]
  };
  