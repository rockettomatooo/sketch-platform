import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import 'regenerator-runtime/runtime';

import ENV from './env';
import registerRoutes from './routes';

mongoose.connect(ENV.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(() => {
    console.error('[ERROR] Could not connect to database.');
    process.exit();
  })
  .then(() => {
    console.log('connected to mongodb');
  });

const app = express();
app.use(cors({ origin: ENV.isDev ? '*' : ENV.rootUrl }));
app.use(express.json({ limit: '5mb' }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api', registerRoutes());

app.listen(ENV.rootPort, () => {
  console.log(`REST-Server ready on ${ENV.rootUrl}`);
});
