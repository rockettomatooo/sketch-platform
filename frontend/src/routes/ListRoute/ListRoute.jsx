import React, { useEffect } from 'react';
import {
  makeStyles, Grid, Typography, Paper, Button,
} from '@material-ui/core';
import EmptySketchesIcon from '@material-ui/icons/PhotoSizeSelectActual';

import { useStoreState, useStoreActions } from 'easy-peasy';

import { Link } from 'react-router-dom';
import ListItem from './ListItem';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
  },
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  emptySketches: {
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#ccc',
  },
  emptyHeading: {
    letterSpacing: theme.spacing(1),
    fontWeight: 2,
    margin: theme.spacing(2),
  },
  emptyIcon: {
    width: '10rem',
    height: '10rem',
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
      <Grid item xs={10}>
        <Typography variant="h3">
          All Sketches
        </Typography>
        <Grid container wrap="wrap" className={classes.listContainer}>
          {sketches.map((sketch) => (
            <ListItem sketchId={sketch._id} />
          ))}
        </Grid>


        {!sketches.length ? (
          <Paper className={classes.emptySketches}>
            <EmptySketchesIcon className={classes.emptyIcon} />
            <Typography className={classes.emptyHeading} variant="h3">No sketches yet!</Typography>
            <Button color="secondary" variant="contained" component={Link} to="/create">
              Create one!
            </Button>
          </Paper>
        ) : null}


      </Grid>
    </Grid>
  );
}
