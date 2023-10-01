import path from 'path';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(dirname, '../.env') });

import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import babysitterRouter from './babysitters/routes.js'
import customerRouter from './customers/routes.js'
import reviewRouter from './reviews/routes.js'
import authRouter from './auth/routes.js'
import cloudinaryRouter from './cloud/cloudinary/routes.js'
import crypto from 'crypto'
import cors from 'cors'
import cookieParser  from 'cookie-parser'
import history from 'connect-history-api-fallback'
import mongoose from './db/database.js';

// import * as dotenv from 'dotenv'
// dotenv.config()

// const rate = babysitters[0].calcAvgRate()

// const router = express.Router();

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser())
app.use(express.static(path.resolve(dirname, './dist'), {maxAge: '1y', etag: false}))

const corsConfig = {
  origin: true,
  credentials: true,
};

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));
}else{
  app.use(history());
}

app.use('/health_check', (req, res, next) => {
  res.status(200).send();
});
// app.use('/api', router);

app.use('/api/babysitter', babysitterRouter);
app.use('/api/customer', customerRouter);
app.use('/api/review', reviewRouter);
app.use('/api/auth', authRouter);
app.use('/api/cloudinary', cloudinaryRouter);




app.use((err, req, res, next) => {
  const errorId = crypto.randomBytes(16).toString('hex');
  let payload = {
    errorId,
    code: err.code,
    data: err.data,
    message: err.customMessage,
  };

  if(process.env.NODE_ENV !== 'production') { // help debugging
    payload.devMessage = err.message;
    payload.devStack = err.stack;
  }

  const status = err.status || 500;

  res.status(status).send(payload);
  console.error(errorId, err);
});

if(process.env.NODE_ENV === 'production'){
  app.get('*', (req,res) => {
    res.sendFile(path.join(dirname, './dist/index.html'));
  })
}

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is listening on port 8080');
});