module.exports = {
  mongo: {
    db: process.env.STAGING_MONGO_DB_NAME,
    hostname: process.env.STAGING_MONGO_CLUSTER_HOSTNAME,
    username: process.env.STAGING_MONGO_USERNAME,
    password: process.env.STAGING_MONGO_PASSWORD,
  },
}
