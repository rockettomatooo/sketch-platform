import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Typography, Paper, Chip,
} from '@material-ui/core';
import ClockIcon from '@material-ui/icons/Schedule';
import CreatedIcon from '@material-ui/icons/AddCircleOutline';

import moment from 'moment';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { DrawingBoard, drawItem } from '../../components/DrawingBoard';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    height: '30rem',
    display: 'block',
  },
  chip: {
    marginRight: theme.spacing(1),
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
      <Grid item xs={10}>
        <div>
          <Typography variant="h3">
            {sketch.title}
          </Typography>
          <Chip
            variant="outlined"
            className={classes.chip}
            avatar={<CreatedIcon />}
            label={`created
            ${moment(sketch.createdAt).fromNow()}`}
          />
          <Chip
            variant="outlined"
            className={classes.chip}
            avatar={<ClockIcon />}
            label={`drawing took ${moment.duration(sketch.timeEdited).humanize({
              ms: 999, s: 59, m: 59, h: 23,
            })}`}
          />
        </div>
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
