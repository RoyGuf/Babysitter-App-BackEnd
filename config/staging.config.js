import path from 'path';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(dirname, '../.env') })
// console.log(process.env.STAGING_MONGO_PASSWORD)

const staging = {
  mongo: {
    db: process.env.STAGING_MONGO_DB_NAME,
    hostname: process.env.STAGING_MONGO_CLUSTER_HOSTNAME,
    username: process.env.STAGING_MONGO_USERNAME,
    password: process.env.STAGING_MONGO_PASSWORD,
  },
}

export default staging