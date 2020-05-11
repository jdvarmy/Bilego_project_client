import React from 'react';
import styled from 'styled-components';

import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Shared from '../../../components/Shared';

const SGrid = styled(Grid)`
  text-align: center;
  span.MuiBox-root{
    margin: 8px;
  }
`;
const Title = styled(Typography)`
  flex-grow: 1;
  text-transform: uppercase;
`;
const Caption = styled(Typography)`
  flex-grow: 1;
  text-transform: lowercase;
  font-weight: 100;
`;
const SBox = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 94px;
`;

export default function ConcertInfo(props){
  const {date_time} = props;
  return(
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Grid container spacing={2}>
          <SGrid item xs={6}>
            <Box component="span" m={1}>
              <Caption component="div" variant="caption">
                {format(new Date(date_time), 'EEEE', { locale: ruLocale })}
              </Caption>
              <Title component="div" variant="h3">
                {format(new Date(date_time), 'd', { locale: ruLocale })}
              </Title>
            </Box>
          </SGrid>
          <SGrid item xs={6}>
            <Box component="span" m={1}>
              <Caption component="div" variant="caption">
                {format(new Date(date_time), 'MMMM', { locale: ruLocale })}
              </Caption>
              <Title component="div" variant="h3">
                {format(new Date(date_time), 'MMM', { locale: ruLocale }).slice(0, 3)}
              </Title>
            </Box>
          </SGrid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2}>
          <SGrid item xs={6}>
            <Box component="span" m={1}>
              <Caption component="div" variant="caption">
                Начало в
              </Caption>
              <Typography component="span" variant="h5">
                {format(new Date(date_time), 'HH:mm', { locale: ruLocale })}
              </Typography>
            </Box>
          </SGrid>
          <SGrid item xs={6}>
            <div style={{margin: '8px'}} />
            <SBox component="div" m={1}>
              <Shared type="vk" />
              <Shared type="facebook" />
              <Shared type="twitter" />
            </SBox>
          </SGrid>
        </Grid>
      </Grid>
    </Grid>
  );
}
