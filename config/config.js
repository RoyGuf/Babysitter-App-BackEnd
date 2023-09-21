const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
import staging from './staging.config';
import production from './production.config';

const envConfig = process.env.NODE_ENV === "production" ? production : staging;

const globalConfig = {
  // global settings (applied for both staging and production)
};

const config = Object.assign(globalConfig, envConfig);

export default  config;
