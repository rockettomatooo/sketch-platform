import { Router } from 'express';

import sketchPost from './post';
import { getAll, getDetails } from './get';

export default function registerSketchRoutes() {
  const sketch = Router();

  sketch.post('/', sketchPost);
  sketch.get('/', getAll);
  sketch.get('/:_id', getDetails);

  return sketch;
}
