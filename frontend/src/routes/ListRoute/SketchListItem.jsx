import React, {
  useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, GridListTile, GridListTileBar, IconButton,
} from '@material-ui/core';
import OpenLinkIcon from '@material-ui/icons/OpenInNew';
import { useHistory } from 'react-router-dom';

import { useStoreActions } from 'easy-peasy';
import { DrawingBoard, drawItem } from '../../components/DrawingBoard';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  gridListTile: {
    height: '30rem',
    margin: theme.spacing(1) / 4,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, '
      + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function SketchListItem({ sketch }) {
  const classes = useStyles();
  const fetchSketch = useStoreActions((actions) => actions.sketches.fetchSketch);
  const history = useHistory();

  const onDraw = useCallback(drawItem, []);

  useEffect(() => {
    fetchSketch(sketch._id);
  }, [sketch._id]);

  return (
    // eslint-disable-next-line no-underscore-dangle
    <GridListTile key={sketch._id} className={classes.gridListTile}>
      {sketch.items ? (
        <DrawingBoard sketch={sketch} onDraw={onDraw} />
      ) : (
        <>Loading ...</>
      )}
      <GridListTileBar
        title={sketch.title}
        className={classes.titleBar}
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
