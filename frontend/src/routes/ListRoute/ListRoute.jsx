import React, { useEffect } from 'react';
import {
  makeStyles, Grid, Typography, Paper, GridList,
} from '@material-ui/core';
import { useStoreState, useStoreActions } from 'easy-peasy';

import SketchListItem from './SketchListItem';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  container: {
    padding: theme.spacing(1),
  },
}));

export default function ListRoute() {
  const classes = useStyles();
  const sketches = useStoreState((state) => state.sketches.list);
  const fetchSketches = useStoreActions((actions) => actions.sketches.fetchAll);
  useEffect(() => {
    fetchSketches();
  }, []);

  return (
    <Grid container justify="center" className={classes.wrapper}>
      <Grid item>
        <Typography variant="h3">
          All Sketches
        </Typography>
        <Paper className={classes.container}>
          <GridList>
            {sketches.map((sketch) => (
              <SketchListItem key={sketch._id} sketch={sketch} />
            ))}
          </GridList>
        </Paper>
      </Grid>
    </Grid>
  );
}
