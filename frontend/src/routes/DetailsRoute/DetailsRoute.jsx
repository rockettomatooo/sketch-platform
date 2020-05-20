import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Typography, Paper, Chip, Button,
} from '@material-ui/core';
import ClockIcon from '@material-ui/icons/Schedule';
import CreatedIcon from '@material-ui/icons/AddCircleOutline';
import DownloadIcon from '@material-ui/icons/GetApp';

import moment from 'moment';
import Canvg from 'canvg';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { DrawingBoard, drawItem, RATIO } from '../../components/DrawingBoard';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    height: '30rem',
    display: 'flex',
    justifyContent: 'center',
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
  const drawingBoardRef = useRef();

  useEffect(() => {
    fetchSketch(sketchId);
  }, [sketchId]);

  const onDraw = useCallback(drawItem, []);

  const onDownload = useCallback(async () => {
    const svgContents = drawingBoardRef.current.getSvgContents();

    const canvas = document.createElement('canvas');
    canvas.width = RATIO;
    canvas.height = RATIO;
    const ctx = canvas.getContext('2d');
    const c = await Canvg.fromString(ctx, svgContents);
    await c.render();
    const imgUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${sketch.title}.png`;
    link.target = '_blank';
    link.href = imgUrl;
    link.click();
  });

  if (!sketch) {
    return <p>Loading ...</p>;
  }

  return (
    <Grid container justify="center" className={classes.wrapper}>
      <Grid item xs={10}>
        <Grid container direction="column">
          <Grid item style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3" style={{ display: 'inline-block' }}>
              {sketch.title}
            </Typography>
            <Button variant="contained" color="secondary" startIcon={<DownloadIcon />} onClick={onDownload}>
              Download
            </Button>
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
        <Paper className={classes.container}>
          <DrawingBoard ref={drawingBoardRef} sketch={sketch} onDraw={onDraw} />
        </Paper>
      </Grid>
    </Grid>
  );
}
DetailsRoute.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ _id: PropTypes.string }) }).isRequired,
};
