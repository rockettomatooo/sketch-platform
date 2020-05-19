import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  canvas: {
    width: '100%',
    height: '100%',
  },
}));

const RATIO = 500;

export function drawItem(item) {
  switch (item.type) {
    case 'line': {
      const [startX, startY] = item.line[0];
      const start = `M${startX} ${startY} `;
      const d = start + item.line.map(([x, y]) => `L${x} ${y}`).join(' ');

      return <path d={d} stroke={item.color} strokeWidth={item.thickness} strokeLinecap="round" fill="none" />;
    }
    default: return null;
  }
}

export function DrawingBoard({
  sketch, onDraw, onStartItem, onExtendItem, onFinishItem,
}) {
  const classes = useStyles();
  const svgRef = useRef(null);

  function calculateProportionateCoordinates(rect, coord) {
    const [absoluteX, absoluteY] = coord;

    // calculate coordinates relative to the rect
    const relativeX = absoluteX - rect.left;
    const relativeY = absoluteY - rect.top;

    // get relative width/height for drawing (in px)
    const relativeWidth = rect.right - rect.left;
    const relativeHeight = rect.bottom - rect.top;

    // calculate a ratio for width/height
    const widthRatio = relativeWidth / RATIO;
    const heightRatio = relativeHeight / RATIO;

    // calculate proportionate coordinates
    // (meaning not actual pixel values but coordinates proportionate to our Ratio)
    const proportionateX = relativeX / widthRatio;
    const proportionateY = relativeY / heightRatio;

    return [proportionateX, proportionateY];
  }

  // only attach handlers if the component is meant to draw
  const isDrawing = onStartItem && onExtendItem && onFinishItem;

  const onMouseDown = useCallback((e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const coord = calculateProportionateCoordinates(rect, [e.clientX, e.clientY]);

    onStartItem(coord);
  });

  const onMouseMove = useCallback((e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const coord = calculateProportionateCoordinates(rect, [e.clientX, e.clientY]);

    onExtendItem(coord);
  });

  const onMouseUp = useCallback(() => {
    onFinishItem();
  });

  return (
    <svg
      ref={svgRef}
      className={classes.canvas}
      viewBox={`0 0 ${RATIO} ${RATIO}`}
      onMouseDown={isDrawing && onMouseDown}
      onMouseMove={isDrawing && onMouseMove}
      onMouseUp={isDrawing && onMouseUp}
      onMouseLeave={isDrawing && onMouseUp}
    >
      {sketch.items.map(onDraw)}
    </svg>
  );
}
DrawingBoard.propTypes = {
  sketch: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })).isRequired,
  }).isRequired,
  onDraw: PropTypes.func.isRequired,
  onStartItem: PropTypes.func,
  onExtendItem: PropTypes.func,
  onFinishItem: PropTypes.func,

};
DrawingBoard.defaultProps = {
  onStartItem: null,
  onExtendItem: null,
  onFinishItem: null,
};
