import React, { useCallback } from 'react';
import {
  Button, Paper, makeStyles, TextField, CircularProgress, Grid,
} from '@material-ui/core';

import { useStoreState, useStoreActions } from 'easy-peasy';
import SketchEdit from './SketchEdit';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: '2rem',
    letterSpacing: 0,
    marginBottom: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(2),
  },
  sketch: {
    border: '1px solid #000',
    height: '30rem',
  },
}));

export default function CreateRoute() {
  const sketch = useStoreState((state) => state.creation);
  const actions = useStoreActions((a) => a.creation);
  const classes = useStyles();

  const uploadSketch = useCallback(() => actions.save(), []);

  return (
    <Grid container justify="center" className={classes.wrapper}>
      <Grid item xs={8}>
        <Grid>
          <Grid container>
            <Grid item xs={10}>
              <TextField InputProps={{ className: classes.title }} fullWidth placeholder="New sketch" value={sketch.title} onChange={(e) => actions.setTitle(e.target.value)} />

            </Grid>
            <Grid item xs={2} alignItems="center">
              <Button fullWidth variant="contained" color="secondary" onClick={uploadSketch} disabled={sketch.loading}>{sketch.loading ? <CircularProgress /> : 'Create'}</Button>
            </Grid>
          </Grid>
        </Grid>
        <Paper className={classes.container}>
          <Grid container justify="center">
            <Grid item className={classes.sketch}>
              <SketchEdit />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
