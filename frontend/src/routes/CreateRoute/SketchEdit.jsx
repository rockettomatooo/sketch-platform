import React, {
  useState, useRef, useCallback, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';

export default function SketchEdit({ items, onDraw }) {
  const [currentLine, setCurrentLine] = useState(null); // line currently in progress
  const canvasRef = useRef(null);

  // start new line
  const startLine = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setCurrentLine([[mouseX, mouseY]]);
  });

  // continue line
  const onMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (currentLine) {
      setCurrentLine(currentLine.concat([[mouseX, mouseY]]));
    }
  });

  // end line and write to lines array
  const endLine = useCallback(() => {
    if (currentLine) {
      onDraw(items.concat([currentLine]));
      setCurrentLine(null);
    }
  });


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

    if (currentLine) {
      drawLine(currentLine);
    }
    items.forEach(drawLine);
  }, [currentLine, items]);

  return (
    <>
      <canvas ref={canvasRef} width="500rem" height="500rem" onMouseDown={startLine} onMouseMove={onMouseMove} onMouseLeave={endLine} onMouseUp={endLine} />
    </>
  );
}
SketchEdit.propTypes = {
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onDraw: PropTypes.func,
};
SketchEdit.defaultProps = {
  onDraw: () => {},
};
