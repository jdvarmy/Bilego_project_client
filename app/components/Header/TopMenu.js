import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { style } from '../../theme';
// import Social from './Social';
// import Logo from './Logo';
// import Cities from './Cities';

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: '1250px',
    margin: 'auto'
  },
  leftCol: {
    height: '100%',
    backgroundColor: style.$first,
    paddingLeft: '30px',
  },
  centerCol: {
    height: '100%',
    backgroundColor: style.$first,
  },
  rightCol: {
    height: '100%',
    backgroundColor: style.$first,
    paddingRight: '30px'
  },
}));

export default function TopMenu() {
  const classes = useStyles();

  return (
    <Grid container className={classes.wrapper} alignItems="center" justify="center">
      <Grid item className={classes.leftCol} span={6}>
        1
        {/* <Social />*/}
      </Grid>
      <Grid item className={classes.centerCol} span={12}>
        2
        {/* <Logo />*/}
      </Grid>
      <Grid item className={classes.rightCol} span={6}>
        3
        {/* <Cities />*/}
      </Grid>
    </Grid>
  );
}
