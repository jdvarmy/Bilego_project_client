import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Event300 } from '../../components/Event';
import BlockHeaderText from '../../components/BlockHeaderText';
import Next from '../../components/Next';
import { BilegoIconRightArrow } from '../../theme/bilegoIcons';
import { LoadingForEventsWith300 } from '../../components/LoadingsTemplate';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;

@inject('pageStore', 'globalStore')
@observer
class EventsSoon extends Component{
  render() {
    const {pageStore:{eventsHot, isLoading}, globalStore:{baseNameForRouting}} = this.props;
    const events = eventsHot && eventsHot.length>0 ? eventsHot : [{id:0},{id:1},{id:2}];

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <BlockHeaderText>
            Популярные события
            <Next ariaLabel="buy" href="#">
              {BilegoIconRightArrow} Смотреть все
            </Next>
          </BlockHeaderText>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {isLoading && eventsHot.length <= 0
              ? <LoadingForEventsWith300 />
              : events.slice(0, 3).map(event=>(
                <Grid key={event.id} item xs={4}>
                  <CardWrap>
                    <Event300 {...event} baseNameForRouting={baseNameForRouting}/>
                  </CardWrap>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </GridWrap>
    );
  }
}

export default EventsSoon;
