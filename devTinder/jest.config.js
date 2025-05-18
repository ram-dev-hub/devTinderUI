    /** @type {import('jest').Config} */
    const config = {
        testEnvironment: 'jsdom',
        transform: {
          '^.+\\.(ts|tsx)?$': 'ts-jest',
        },
        setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      };
      
      module.exports = config;