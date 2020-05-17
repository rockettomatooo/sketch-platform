import React, {
  useState, useEffect, useRef, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Typography, Paper,
} from '@material-ui/core';
import axios from 'axios';

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
  const [sketch, setSketch] = useState(null);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`http://localhost:8080/api/sketches/${match.params._id}`);
      setSketch(res.data.data);
    })();
  }, []);

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
          <SketchDisplay items={sketch.items} />
        </Paper>
      </Grid>
    </Grid>
  );
}
DetailsRoute.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ _id: PropTypes.string }) }).isRequired,
};

function SketchDisplay({ items }) {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const rect = canvasRef.current.getBoundingClientRect();

    // reset to background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, rect.right - rect.left, rect.bottom - rect.top);

    ctx.strokeStyle = '#000';
    function drawLine(line) {
      // set starting point
      ctx.beginPath();
      ctx.moveTo(line[0][0], line[0][1]);

      line.forEach(([x, y]) => {
        ctx.lineTo(x, y);
      });

      ctx.stroke();
    }

    items.forEach(drawLine);
  }, [items]);

  return (
    <>
      <canvas ref={canvasRef} width="500rem" height="500rem" />
    </>
  );
}
SketchDisplay.propTypes = {
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
