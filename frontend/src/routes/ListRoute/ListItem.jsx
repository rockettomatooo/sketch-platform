import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Typography, Paper, IconButton,
} from '@material-ui/core';
import OpenLinkIcon from '@material-ui/icons/OpenInNew';
import ClockIcon from '@material-ui/icons/Schedule';
import CreatedIcon from '@material-ui/icons/AddCircleOutline';
import moment from 'moment';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

import { DrawingBoard, drawItem } from '../../components/DrawingBoard';


const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    margin: theme.spacing(1),
  },
  titlebar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, '
      + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    color: '#fff',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titlebarInnerLeft: {
    padding: theme.spacing(2),
  },
  titlebarInnerRight: {
    marginRight: theme.spacing(1),
  },
  icon: {
    color: '#fff',
  },
  metadata: { display: 'flex', alignItems: 'center', flexDirection: 'row' },
}));

export default function ListItem({ sketchId }) {
  const classes = useStyles();
  const onDraw = useCallback(drawItem);
  const history = useHistory();
  const sketch = useStoreState((state) => state.sketches.data[sketchId]);


  const fetchSketch = useStoreActions((actions) => actions.sketches.fetchSketch);

  useEffect(() => {
    fetchSketch(sketchId);
  }, [sketchId]);

  return (
    <Grid item xs={10} sm={5} md={4} lg={4}>
      <Paper className={classes.container}>
        {sketch.items ? (
          <DrawingBoard sketch={sketch} onDraw={onDraw} />
        ) : null}
        <div className={classes.titlebar}>
          <div className={classes.titlebarInnerLeft}>
            <Typography variant="h6">{sketch.title}</Typography>
            <span className={classes.metadata}>
              <CreatedIcon />
              &nbsp; created &nbsp;
              {moment(sketch.createdAt).fromNow()}
            </span>
            <span className={classes.metadata}>
              <ClockIcon />
              &nbsp;
              took &nbsp;
              {moment.duration(sketch.timeEdited).humanize({
                ms: 999, s: 59, m: 59, h: 23,
              })}
            </span>
          </div>
          <div className={classes.titlebarInnerRight}>
            <IconButton className={classes.icon} onClick={() => history.push(`/sketches/${sketch._id}`)}>
              <OpenLinkIcon />
            </IconButton>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}
ListItem.propTypes = {
  sketchId: PropTypes.string.isRequired,
};
