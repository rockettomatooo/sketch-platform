import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Typography, Paper,
} from '@material-ui/core';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { DrawingBoard, drawItem } from '../../components/DrawingBoard';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(1),
  },
}));


export default function DetailsRoute({ match }) {
  const classes = useStyles();
  const sketchId = match.params._id;
  const fetchSketch = useStoreActions((actions) => actions.sketches.fetchSketch);
  const sketch = useStoreState((state) => state.sketches.data[sketchId]);

  useEffect(() => {
    fetchSketch(sketchId);
  }, [sketchId]);

  const onDraw = useCallback(drawItem, []);

  if (!sketch) {
    return <p>Loading ...</p>;
  }

  return (
    <Grid container justify="center" className={classes.wrapper}>
      <Grid item xs={8}>
        <Typography variant="h3">
          {sketch.title}
        </Typography>
        <Paper className={classes.container}>
          <DrawingBoard sketch={sketch} onDraw={onDraw} />
        </Paper>
      </Grid>
    </Grid>
  );
}
DetailsRoute.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ _id: PropTypes.string }) }).isRequired,
};
