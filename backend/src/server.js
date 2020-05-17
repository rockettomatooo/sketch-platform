import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import 'regenerator-runtime/runtime';

import registerRoutes from './routes';

mongoose.connect('mongodb://localhost:27017/sketch_db', { useNewUrlParser: true, useUnifiedTopology: true }).catch(() => {
  console.error('[ERROR] Could not connect to database.');
  process.exit();
}).then(() => {
  console.log('connected to mongodb');
});

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api', registerRoutes());

app.listen(8080, () => {
  console.log('REST-Server ready on http://localhost:8080/');
});
