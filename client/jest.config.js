module.exports = {
  "automock": false,
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).ts"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "setupFiles": [
    "isomorphic-fetch",
    "fake-indexeddb/auto"
  ],
  "testEnvironment": "jest-environment-jsdom-sixteen"
}
