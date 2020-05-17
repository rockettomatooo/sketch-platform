import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Paper, makeStyles, TextField, CircularProgress, Grid,
} from '@material-ui/core';
import axios from 'axios';

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
  },
}));

export default function CreateRoute() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const uploadSketch = useCallback(async () => {
    try {
      setLoading(true);
      console.log(JSON.stringify({ items, title }));
      const res = await axios.post('http://localhost:8080/api/sketches', { items, title });
      console.log(res);
      // eslint-disable-next-line no-underscore-dangle
      history.push(`/sketches/${res.data._id}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  });

  return (
    <Grid container justify="center" className={classes.wrapper}>
      <Grid item xs={8}>
        <Grid>
          <Grid container>
            <Grid item xs={10}>
              <TextField InputProps={{ className: classes.title }} fullWidth placeholder="New sketch" value={title} onChange={(e) => setTitle(e.target.value)} />

            </Grid>
            <Grid item xs={2} alignItems="center">
              <Button fullWidth variant="contained" color="secondary" onClick={uploadSketch} disabled={loading}>{loading ? <CircularProgress /> : 'Create'}</Button>
            </Grid>
          </Grid>
        </Grid>
        <Paper className={classes.container}>
          <Grid container justify="center">
            <Grid item className={classes.sketch}>
              <SketchEdit items={items} onDraw={setItems} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
