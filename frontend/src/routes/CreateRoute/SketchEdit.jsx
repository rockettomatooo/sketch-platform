import React, { useCallback } from 'react';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { DrawingBoard, drawItem } from '../../components/DrawingBoard';

export default function SketchEdit() {
  const sketch = useStoreState((state) => state.creation);
  console.log(sketch);
  const actions = useStoreActions((a) => a.creation);

  const onStartItem = useCallback(actions.startNewItem, []);
  const onExtendItem = useCallback(actions.extendCurrentItem, []);
  const onFinishItem = useCallback(actions.finishCurrentItem, []);

  const onDraw = useCallback(drawItem, []);
  return (
    <DrawingBoard sketch={sketch} onDraw={onDraw} onStartItem={onStartItem} onExtendItem={onExtendItem} onFinishItem={onFinishItem} />
  );
}
