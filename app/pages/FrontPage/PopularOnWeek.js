import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Event300 } from '../../components/Event';
import { LoadingForEventsWith200 } from '../../components/LoadingsTemplate';
import BlockHeaderTextH3 from '../../components/BlockHeaderTextH3';

import css from '../../theme/style';

const GridWrap = styled(Grid)`
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: ${css.sizes.xxl};
`;

@inject('pageStore', 'globalStore')
@observer
class PopularOnWeek extends Component{
  componentDidMount() {
    const {pageStore:{getPopularOnWeek}, globalStore:{baseNameForRouting}} = this.props;
    getPopularOnWeek({city: baseNameForRouting});
  }

  render() {
    const {pageStore:{popularOnWeek, isLoading}, globalStore:{baseNameForRouting}} = this.props;
    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <BlockHeaderTextH3>
            Популярные события
          </BlockHeaderTextH3>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {isLoading || popularOnWeek.length <= 0
              ? <LoadingForEventsWith200 />
              : popularOnWeek.slice(0, 3).map(event=>(
                <Grid key={event.id} item xs={4}>
                  <CardWrap>
                    <Event300 {...event} baseNameForRouting={baseNameForRouting}/>
                  </CardWrap>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item xs={12} />
      </GridWrap>
    );
  }
}

export default PopularOnWeek;
