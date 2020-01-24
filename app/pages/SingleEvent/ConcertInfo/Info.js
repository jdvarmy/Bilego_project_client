import React from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Shared from '../../../components/Shared';

const Wrap = styled.div`
  padding: auto 20px;
  overflow: hidden;
`;

const useStyles = makeStyles(theme => ({
  grid: {
    textAlign: 'center'
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
  caption: {
    flexGrow: 1,
    textTransform: 'lowercase',
    fontWeight: 100
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '94px'
  }
}));

export default function ConcertInfo(props){
  const classes = useStyles();

  return(
    <Wrap>
      <Grid container spacing={4}>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={4}>
          <Grid item xs={6} className={classes.grid}>
            <Box component="span" m={1}>
              <Typography component="div" variant="caption" className={classes.caption}>
                {props.day_of_week}
              </Typography>
              <Typography component="div" variant="h3" className={classes.title}>
                {props.day}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.grid}>
            <Box component="span" m={1}>
              <Typography component="div" variant="caption" className={classes.caption}>
                {props.month}
              </Typography>
              <Typography component="div" variant="h3" className={classes.title}>
                {props.month_short}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={4}>
          <Grid item xs={6} className={classes.grid}>
            <Box component="span" m={1}>
              <Typography component="div" variant="caption" className={classes.caption}>
                Время
              </Typography>
              <Typography component="span" variant="h5">
                в {props.time}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.grid}>
            <Box component="div" m={1} className={classes.box}>
              <Shared type="vk" />
              <Shared type="facebook" />
              <Shared type="twitter" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Wrap>
  );
}
