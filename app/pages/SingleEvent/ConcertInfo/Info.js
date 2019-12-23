import React from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import style from '../../../theme/style';
import { BilegoIconFacebook, BilegoIconVk } from '../../../theme/bilegoIcons';

const StyledIconButton = styled(IconButton)`
  margin: 0 5px!important;
  svg{
    cursor: pointer;
    vertical-align: middle;
    font-size: 1.25rem!important;
    color: ${style.$black};
    &:hover{
      fill: ${style.$red};
    }
  }
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
              {vk}
              {facebook}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const vk = (
  <a href="#">
    <StyledIconButton className="bilego-button" aria-label="vk">
      {BilegoIconVk}
    </StyledIconButton>
  </a>
);
const facebook = (
  <a href="#">
    <StyledIconButton className="bilego-button" aria-label="facebook">
      {BilegoIconFacebook}
    </StyledIconButton>
  </a>
);