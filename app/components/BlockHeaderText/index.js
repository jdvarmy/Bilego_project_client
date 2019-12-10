import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { style } from '../../theme';

const useStyles = makeStyles(theme => ({
  title: {
    color: style.$black
  },
}));

export default function BlockHeaderText(props) {
  const classes = useStyles();
  return(
    <Typography variant="h3" component="h3" className={classes.title}>
      {props.children}
    </Typography>
  )
};