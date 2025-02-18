const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const envDir = path.resolve(__dirname, "../environments");

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const envFilePath = path.join(envDir, "environment.ts");

const envConfig = `export const environment = {
  production: false,
  apiKey: '${process.env.API_KEY}'
};`;

fs.writeFileSync(envFilePath, envConfig);
