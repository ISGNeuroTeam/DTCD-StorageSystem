module.exports = {
  verbose: true,
  setupFiles: ['fake-indexeddb/auto'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    '^SDK$': '<rootDir>/../DTCD-SDK',
    '^utils/(.*)$': '<rootDir>/tests/utils/$1',
  },
};
