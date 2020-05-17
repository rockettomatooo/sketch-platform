import React, { useState, useEffect } from 'react';
import {
  makeStyles, Grid, Typography, Paper, GridList,
} from '@material-ui/core';
import axios from 'axios';

import SketchListItem from './SketchListItem';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(1),
  },
}));

export default function ListRoute() {
  const classes = useStyles();
  const [sketches, setSketches] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:8080/api/sketches');
      setSketches(res.data.data);
    })();
  }, []);

  return (
    <Grid container justify="center" className={classes.wrapper}>
      <Grid item xs={8}>
        <Typography variant="h3">
          All Sketches
        </Typography>
        <Paper className={classes.container}>
          <GridList cellHeight={200}>
            {sketches.map((sketch) => (
              <SketchListItem sketch={sketch} />
            ))}
          </GridList>
        </Paper>
      </Grid>
    </Grid>
  );
}
