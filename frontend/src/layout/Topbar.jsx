import React from 'react';

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Topbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/">Sketch Playground</Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          component={Link}
          to="/create"
        >
          Create
        </Button>
      </Toolbar>
    </AppBar>
  );
}
