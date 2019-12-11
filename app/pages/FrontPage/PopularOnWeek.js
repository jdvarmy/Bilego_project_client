import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Event200 } from '../../components/Event';
import BlockHeaderText from '../../components/BlockHeaderText';
import Next from '../../components/Next';
import { BilegoIconRightArrow } from '../../theme/BilegoIcons';

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
class PopularOnWeek extends Component{
  componentDidMount() {
    const {pageStore:{getPopularOnWeek}} = this.props;
    getPopularOnWeek();
  }

  render() {
    const {pageStore:{popularOnWeek}, globalStore:{baseNameForRouting}} = this.props;
    const events = popularOnWeek && popularOnWeek.length>0 ? popularOnWeek : [{id:0},{id:1},{id:2}];

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <BlockHeaderText>
            Популярно на этой неделе
            <Next ariaLabel="buy">
              {BilegoIconRightArrow} Смотреть все
            </Next>
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
    );
  }
}

export default PopularOnWeek;