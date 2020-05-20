import React from 'react';
import {
  makeStyles, Grid, Paper, Typography,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Report';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',

    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  icon: {
    width: '15rem',
    height: '15rem',
    color: '#bbb',
  },
}));

export default function ErrorFallback() {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <div>
            <ErrorIcon className={classes.icon} />
          </div>
          <Typography variant="h2">Oops! Looks like something went wrong.</Typography>
          <Typography variant="body1">
            Please reload the page and try again.
            If the problem keeps happening, please contact our web team.
          </Typography>
        </Paper>
      </Grid>
    </Grid>

  );
}
