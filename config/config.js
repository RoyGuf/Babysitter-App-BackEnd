import path from 'path';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(dirname, '../.env') });

import staging from './staging.config.js';
import production from './production.config.js';

const envConfig = process.env.NODE_ENV === "production" ? production : staging;

const globalConfig = {
  // global settings (applied for both staging and production)
};

const config = Object.assign(globalConfig, envConfig);

export default  config;
