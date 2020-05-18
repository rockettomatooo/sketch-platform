import React, {
  useCallback, useEffect,
} from 'react';
import {
  makeStyles, Grid, Divider, TextField,
} from '@material-ui/core';


import { useStoreState, useStoreActions } from 'easy-peasy';

import { DrawingBoard, drawItem } from '../../components/DrawingBoard';
import BrushPicker from '../../components/BrushPicker';
import ColorPicker from '../../components/ColorPicker';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
  },
  item: {
    height: '100%',
    border: '1px solid #000',
  },
  toolbar: {
    height: '100%',
    background: '#dfdfdf',
    borderRadius: theme.spacing(1) / 2,
    marginLeft: theme.spacing(2),
  },
  innerToolbar: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  thickness: {
    maxWidth: '4rem',
  },
}));

export default function SketchEdit() {
  const classes = useStyles();
  const sketch = useStoreState((state) => state.creation);
  const actions = useStoreActions((a) => a.creation);

  const onStartItem = useCallback(actions.startNewItem, []);
  const onExtendItem = useCallback(actions.extendCurrentItem, []);
  const onFinishItem = useCallback(actions.finishCurrentItem, []);

  const onDraw = useCallback(drawItem, []);

  useEffect(() => () => actions.reset(), []);

  return (
    <Grid container className={classes.container} wrap="nowrap">
      <Grid item className={classes.item}>
        <DrawingBoard sketch={sketch} onDraw={onDraw} onStartItem={onStartItem} onExtendItem={onExtendItem} onFinishItem={onFinishItem} />
      </Grid>
      <Grid item>
        <div className={classes.toolbar}>
          <div className={classes.innerToolbar}>
            <BrushPicker brush={sketch.currentBrush} onChange={actions.changeBrush} />
            <Divider className={classes.divider} />
            <ColorPicker disabled={sketch.currentBrush === 'eraser'} color={sketch.currentColor} onChange={actions.changeColor} />
            <Divider className={classes.divider} />
            <TextField className={classes.thickness} size="small" type="number" label="Thickness" value={sketch.currentThickness} onChange={(e) => actions.changeThickness(parseInt(e.target.value, 10))} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
