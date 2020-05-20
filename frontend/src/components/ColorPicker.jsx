import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles, colors, Button, Popover, IconButton,
} from '@material-ui/core';
import ColorPaletteIcon from '@material-ui/icons/ColorLens';


const useStyles = makeStyles((theme) => ({
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
    margin: theme.spacing(1) / 4,
    cursor: 'pointer',
  },
  popoverItemSelected: {
    display: 'block',
    margin: theme.spacing(1) / 4,
    cursor: 'pointer',
    border: '2px solid #000',
  },
}));

export default function ColorPicker({ color, onChange, disabled }) {
  const classes = useStyles();
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
            <IconButton
              onClick={() => handleColorChange(option)}
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
