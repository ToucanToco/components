module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^tc-components(.*)$': '<rootDir>/src$1',
  },
  testMatch: ['**/*.spec.[jt]s'],
};
