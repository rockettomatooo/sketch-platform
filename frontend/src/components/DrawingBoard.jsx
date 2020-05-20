import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  svg: {
    width: '100%',
    height: '100%',
  },
});

export const RATIO = 500;

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
class DrawingBoardComponent extends React.Component {
  svgRef = React.createRef()

  onMouseDown = (e) => {
    const { onStartItem } = this.props;
    const rect = this.svgRef.current.getBoundingClientRect();
    const coord = this.calculateProportionateCoordinates(rect, [e.clientX, e.clientY]);

    onStartItem(coord);
  }

  onMouseMove = (e) => {
    const { onExtendItem } = this.props;
    const rect = this.svgRef.current.getBoundingClientRect();
    const coord = this.calculateProportionateCoordinates(rect, [e.clientX, e.clientY]);

    onExtendItem(coord);
  }

  onMouseUp = () => {
    const { onFinishItem } = this.props;
    onFinishItem();
  }

  getSvgContents() {
    if (this.svgRef.current) {
      return this.svgRef.current.outerHTML;
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  calculateProportionateCoordinates(rect, coord) {
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

  render() {
    const {
      sketch, onDraw, classes, onStartItem, onExtendItem, onFinishItem,
    } = this.props;

    // only attach handlers if the component is meant to draw
    const isDrawing = onStartItem && onExtendItem && onFinishItem;

    return (
      <svg
        ref={this.svgRef}
        className={classes.svg}
        viewBox={`0 0 ${RATIO} ${RATIO}`}
        onMouseDown={isDrawing && this.onMouseDown}
        onMouseMove={isDrawing && this.onMouseMove}
        onMouseUp={isDrawing && this.onMouseUp}
        onMouseLeave={isDrawing && this.onMouseUp}
      >
        {sketch.items.map(onDraw)}
      </svg>
    );
  }
}
DrawingBoardComponent.propTypes = {
  sketch: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })).isRequired,
  }).isRequired,
  onDraw: PropTypes.func.isRequired,
  onStartItem: PropTypes.func,
  onExtendItem: PropTypes.func,
  onFinishItem: PropTypes.func,
  classes: PropTypes.shape({
    svg: PropTypes.string,
  }).isRequired,
};

DrawingBoardComponent.defaultProps = {
  onStartItem: null,
  onExtendItem: null,
  onFinishItem: null,
};


export const DrawingBoard = withStyles(styles)(DrawingBoardComponent);
