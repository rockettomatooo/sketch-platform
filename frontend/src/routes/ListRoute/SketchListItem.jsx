import React, {
  useState, useEffect, useRef, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, GridListTile, GridListTileBar, IconButton,
} from '@material-ui/core';
import OpenLinkIcon from '@material-ui/icons/OpenInNew';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function SketchListItem({ sketch }) {
  const classes = useStyles();
  const [sketchData, setSketchData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`http://localhost:8080/api/sketches/${sketch._id}`);
      setSketchData(res.data.data);
    })();
  }, []);
  return (
    // eslint-disable-next-line no-underscore-dangle
    <GridListTile key={sketch._id} style={{ width: '100%' }}>
      {sketchData ? (
        <SketchDisplay items={sketchData.items} />
      ) : (
        <>Loading ...</>
      )}
      <GridListTileBar
        title={sketch.title}
        subtitle={(
          <span>
            created at:
            {' '}
            {sketch.createdAt.toLocaleString()}
          </span>
)}
        actionIcon={(
          // eslint-disable-next-line no-underscore-dangle
          <IconButton className={classes.icon} onClick={() => history.push(`/sketches/${sketch._id}`)}>
            <OpenLinkIcon />
          </IconButton>
        )}
      />
    </GridListTile>
  );
}
SketchListItem.propTypes = {
  sketch: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
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
