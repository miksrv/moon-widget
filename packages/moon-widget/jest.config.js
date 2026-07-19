/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: '.',
    moduleNameMapper: {
        '\\.(css)$': 'identity-obj-proxy',
        '\\.(png|jpg|jpeg|gif)$': '<rootDir>/test/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
