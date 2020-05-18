import React, { useEffect, useCallback } from 'react';
import {
  makeStyles, Grid, Typography, Paper, GridList, Button, IconButton,
} from '@material-ui/core';
import EmptySketchesIcon from '@material-ui/icons/PhotoSizeSelectActual';
import OpenLinkIcon from '@material-ui/icons/OpenInNew';

import { useStoreState, useStoreActions } from 'easy-peasy';

import { Link, useHistory } from 'react-router-dom';
import SketchListItem from './SketchListItem';
import { DrawingBoard, drawItem } from '../../components/DrawingBoard';

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
        <div className={classes.listContainer}>
          {sketches.map((sketch) => (
            <ListItem sketch={sketch} />
          ))}
        </div>


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

const useListItemStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    maxWidth: '20rem',
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
  icon: {
    color: '#fff',
  },
}));

function ListItem({ sketch }) {
  const classes = useListItemStyles();
  const onDraw = useCallback(drawItem);
  const history = useHistory();


  const fetchSketch = useStoreActions((actions) => actions.sketches.fetchSketch);

  useEffect(() => {
    fetchSketch(sketch._id);
  }, [sketch._id]);

  return (
    <Paper className={classes.container}>
      { sketch.items ? (
        <DrawingBoard sketch={sketch} onDraw={onDraw} />
      ) : null}
      <div className={classes.titlebar}>
        <div className={classes.titlebarInnerLeft}>
          <Typography variant="h6">{sketch.title}</Typography>
        </div>
        <div className={classes.titlebarInnerRight}>
          <IconButton className={classes.icon} onClick={() => history.push(`/sketches/${sketch._id}`)}>
            <OpenLinkIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
}
