import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { style } from '../../theme';

const useStyles = makeStyles(() => ({
  title: {
    color: style.$black
  }
}));

export default function BlockHeaderText(props) {
  const classes = useStyles();
  return (
    <Typography className={classes.title} component="h1" variant="h2">
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </Typography>
  );
}
