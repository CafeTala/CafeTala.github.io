module.exports = {
  // ...existing code...
  // Remove the moduleNameMapper for axios
  // moduleNameMapper: {
  //   '^axios$': '<rootDir>/src/__mocks__/axios.js',
  // },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  // ...existing code...
};