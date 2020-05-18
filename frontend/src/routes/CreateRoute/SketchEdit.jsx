import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Divider, Button, Popover, colors, Tooltip, TextField,
} from '@material-ui/core';

import ColorPaletteIcon from '@material-ui/icons/ColorLens';
import EraserIcon from '@material-ui/icons/Backspace';
import LineIcon from '@material-ui/icons/Edit';


import { useStoreState, useStoreActions } from 'easy-peasy';
import { DrawingBoard, drawItem } from '../../components/DrawingBoard';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
  },
  item: {
    height: '100%',
    border: '1px solid #000',
  },
  toolbar: {
    height: '100%',
    background: '#dfdfdf',
    borderRadius: theme.spacing(1) / 2,
    marginLeft: theme.spacing(2),
  },
  innerToolbar: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  thickness: {
    maxWidth: '4rem',
  },
}));

export default function SketchEdit() {
  const classes = useStyles();
  const sketch = useStoreState((state) => state.creation);
  const actions = useStoreActions((a) => a.creation);

  const onStartItem = useCallback(actions.startNewItem, []);
  const onExtendItem = useCallback(actions.extendCurrentItem, []);
  const onFinishItem = useCallback(actions.finishCurrentItem, []);

  const onDraw = useCallback(drawItem, []);
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.item}>
        <DrawingBoard sketch={sketch} onDraw={onDraw} onStartItem={onStartItem} onExtendItem={onExtendItem} onFinishItem={onFinishItem} />
      </Grid>
      <Grid item>
        <div className={classes.toolbar}>
          <div className={classes.innerToolbar}>
            <BrushPicker brush={sketch.currentBrush} onChange={actions.changeBrush} />
            <Divider className={classes.divider} />
            <ColorPicker disabled={sketch.currentBrush === 'eraser'} color={sketch.currentColor} onChange={actions.changeColor} />
            <Divider className={classes.divider} />
            <TextField className={classes.thickness} size="small" type="number" label="Thickness" value={sketch.currentThickness} onChange={(e) => actions.changeThickness(parseInt(e.target.value, 10))} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const useBrushPickerStyles = makeStyles((theme) => ({
  popoverWrapper: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '8rem',
  },
  popoverItem: {
    display: 'block',
    margin: theme.spacing(1) / 2,
    cursor: 'pointer',
  },
}));

function BrushPicker({ brush, onChange }) {
  const classes = useBrushPickerStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const brushOptions = useMemo(() => ({
    line: <LineIcon />,
    eraser: <EraserIcon />,
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (newBrush) => {
    onChange(newBrush);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClick}>
        {brushOptions[brush]}
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <div className={classes.popoverWrapper}>
          {Object
            .keys(brushOptions)
            .map((option) => (
              <Tooltip title={option}>
                <div onClick={handleChange.bind(null, option)} className={classes.popoverItem}>
                  {brushOptions[option]}
                </div>
              </Tooltip>
            ))}
        </div>
      </Popover>
    </>
  );
}
BrushPicker.propTypes = {
  brush: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const useColorPickerStyles = makeStyles((theme) => ({
  popoverWrapper: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '8rem',
  },
  popoverItem: {
    display: 'block',
    width: '1rem',
    height: '1rem',
    margin: theme.spacing(1) / 2,
    cursor: 'pointer',
  },
  popoverItemSelected: {
    display: 'block',
    width: '1.3rem',
    height: '1.3rem',
    margin: theme.spacing(1) / 2,
    cursor: 'pointer',
  },
}));

function ColorPicker({ color, onChange, disabled }) {
  const classes = useColorPickerStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const colorOptions = useMemo(() => ['#000'].concat(Object.values(colors).map((c) => c[500]).filter((c) => !!c)));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (newColor) => {
    onChange(newColor);
    handleClose();
  };

  return (
    <>
      <Button disabled={disabled} onClick={handleClick}>
        <ColorPaletteIcon style={{ color }} />
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <div className={classes.popoverWrapper}>
          {colorOptions.map((option) => (
            <div
              onClick={handleColorChange.bind(null, option)}
              className={option === color ? classes.popoverItemSelected : classes.popoverItem}
              style={{ background: option }}
            />
          ))}
        </div>
      </Popover>
    </>
  );
}
ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
ColorPicker.defaultProps = {
  disabled: false,
};
