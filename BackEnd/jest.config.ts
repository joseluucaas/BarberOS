import type { Config } from "jest";

const config: Config = {
preset: "ts-jest/presets/default-esm",
testEnvironment: "node",

extensionsToTreatAsEsm: [".ts"],

roots: ["<rootDir>/src"],
testMatch: [
"/tests//.test.ts",
"**/?(.)+(spec|test).ts",
],

moduleFileExtensions: ["ts", "js", "json"],

transform: {
"^.+\.ts$": [
"ts-jest",
{
useESM: true,
tsconfig: "tsconfig.json",
},
],
},

collectCoverageFrom: [
"src//*.ts",
"!src//.test.ts",
"!src/**/.spec.ts",
"!src//tests/",
],

coverageDirectory: "coverage",
coverageProvider: "v8",

clearMocks: true,
restoreMocks: true,
};

export default config;