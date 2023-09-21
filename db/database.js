import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
import mongoose, { connect, connection } from "mongoose";
import Logger from '../logger/service';
import config from '../config/config';

const mongo = config.mongo

const dbPath = `mongodb+srv://${mongo.username}:${mongo.password}@${mongo.hostname}/${mongo.db}?retryWrites=true&w=majority`;
// mongoose.set('debug', true);

// mongoose.connect(dbPath, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection
// db.on("error", () => {
//   Logger.error("Error occurred from Mongo at " + mongo.db + '@' + mongo.hostname);
// });
// db.on("open", () => {
//   Logger.log("Successfully connected to Mongo at " + mongo.db + '@' + mongo.hostname);
// });

export default mongoose;
