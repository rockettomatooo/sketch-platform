import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles, Button, Popover, Tooltip,
} from '@material-ui/core';

import EraserIcon from '@material-ui/icons/Backspace';
import LineIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
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

export default function BrushPicker({ brush, onChange }) {
  const classes = useStyles();
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
