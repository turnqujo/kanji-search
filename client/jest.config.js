module.exports = {
  automock: false,
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  modulePaths: [
    "<rootDir>"
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  setupFiles: ['isomorphic-fetch', 'fake-indexeddb/auto']
}
