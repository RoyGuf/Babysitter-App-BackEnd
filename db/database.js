import mongoose from "mongoose";
import Logger from '../logger/service.js';
import config from '../config/config.js';

const mongo = config.mongo 
const dbPath = `mongodb+srv://${mongo.username}:${mongo.password}@${mongo.hostname}/${mongo.db}?retryWrites=true&w=majority`;
// mongoose.set('debug', true);

mongoose.connect(dbPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection
db.on("error", () => {
  Logger.error("Error occurred from Mongo at " + mongo.db + '@' + mongo.hostname);
});
db.on("open", () => {
  Logger.log("Successfully connected to Mongo at " + mongo.db + '@' + mongo.hostname);
});

export default mongoose;
