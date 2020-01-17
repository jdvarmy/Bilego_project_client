import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Event200 } from '../../components/Event';
import BlockHeaderText from '../../components/BlockHeaderText';
import Next from '../../components/Next';
import { BilegoIconRightArrow } from '../../theme/bilegoIcons';
import { LoadingForEventsWith200 } from '../../components/LoadingsTemplate';

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
    const {pageStore:{getPopularOnWeek}, globalStore:{apiRoot}} = this.props;
    getPopularOnWeek(apiRoot);
  }

  render() {
    const {pageStore:{popularOnWeek, isLoading}, globalStore:{baseNameForRouting}} = this.props;
    // const events = popularOnWeek && popularOnWeek.length>0 ? popularOnWeek : [{id:0},{id:1},{id:2}];

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <BlockHeaderText>
            Популярно на этой неделе
          </BlockHeaderText>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {isLoading || popularOnWeek.length <= 0
              ? <LoadingForEventsWith200 />
              : popularOnWeek.slice(0, 3).map(event=>(
                <Grid key={event.id} item xs={4}>
                  <CardWrap>
                    <Event200 {...event} baseNameForRouting={baseNameForRouting}/>
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

export default PopularOnWeek;