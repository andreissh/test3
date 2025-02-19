const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const envDir = path.resolve(__dirname, "../environments");

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const devEnvFilePath = path.join(envDir, "environment.ts");
const devEnvConfig = `export const environment = {
  production: false,
  apiKey: '${process.env.API_KEY}'
};`;
fs.writeFileSync(devEnvFilePath, devEnvConfig);

const prodEnvFilePath = path.join(envDir, "environment.prod.ts");
const prodEnvConfig = `export const environment = {
  production: true,
  apiKey: '${process.env.API_KEY}'
};`;
fs.writeFileSync(prodEnvFilePath, prodEnvConfig);
