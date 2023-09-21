require('dotenv').config();
import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import babysitterRouter from './babysitters/routes'
import customerRouter from './customers/routes'
import reviewRouter from './reviews/routes'
import authRouter from './auth/routes'
import cloudinaryRouter from './cloud/cloudinary/routes'
import crypto from 'crypto'
import cors from 'cors'
import cookieParser  from 'cookie-parser'
import path from 'path';
import history from 'connect-history-api-fallback'

// import * as dotenv from 'dotenv'
// dotenv.config()

// const rate = babysitters[0].calcAvgRate()

// const router = express.Router();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, './dist'), {maxAge: '1y', etag: false}))
app.use(history());

const corsConfig = {
  origin: true,
  credentials: true,
};
if (process.env.NODE_ENV !== 'production') {
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));
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

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
})

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is listening on port 8080');
});