import { Router } from 'express';

import registerSketchRoutes from './sketch';

export default function registerRoutes() {
  const api = Router();

  api.use('/sketches', registerSketchRoutes());

  return api;
}
