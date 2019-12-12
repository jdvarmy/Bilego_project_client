import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import BlockHeaderText from '../../components/BlockHeaderText';
import { Event200 } from '../../components/Event';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;

export default function Events(props){
  const {events, baseNameForRouting} = props;

  return (
    <GridWrap container spacing={4}>
      <Grid item xs={12}>
        <BlockHeaderText>
          События
        </BlockHeaderText>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {events.map(event=>(
            <Grid key={event.id} item xs={4}>
              <CardWrap>
                <Event200 {...event} baseNameForRouting={baseNameForRouting}/>
              </CardWrap>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </GridWrap>
  )
}