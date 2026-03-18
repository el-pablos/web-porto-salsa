/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "^framer-motion$": "<rootDir>/__mocks__/framer-motion.js",
    "^react-intersection-observer$":
      "<rootDir>/__mocks__/react-intersection-observer.js",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "commonjs",
          esModuleInterop: true,
          allowJs: true,
          paths: {
            "@/*": ["./src/*"],
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(react-icons)/)"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/e2e/",
  ],
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "!src/components/**/index.{ts,tsx}",
  ],
};

module.exports = config;
