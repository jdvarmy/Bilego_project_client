import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Flickity from 'react-flickity-component';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../../theme/style';
import { Event143 } from '../../components/Event';

const GridWrap = styled(Grid)`
  padding: 0 16px;
`;
const SBlockHeaderText = styled(Typography)`
  a{ color: ${style.$black}; }
`;

@inject('pageStore', 'globalStore')
@observer
class PopularOnWeek extends Component{
  componentDidMount() {
    const {pageStore:{getPopularOnWeek}, globalStore:{baseNameForRouting}} = this.props;
    getPopularOnWeek({city: baseNameForRouting});
  }

  render() {
    const {pageStore:{popularOnWeek}, globalStore:{baseNameForRouting}} = this.props;
    const events = popularOnWeek && popularOnWeek.length>0 ? popularOnWeek : [{id:0},{id:1},{id:2}];

    return (
      <GridWrap container spacing={3}>
        <Grid item xs={12}>
          <SBlockHeaderText component="h5" variant="h5">
            Популярно на этой неделе
          </SBlockHeaderText>
        </Grid>
        <Grid item xs={12}>
          <Flickity options={{
            prevNextButtons: false,
            pageDots: false,
            contain: true,
            freeScroll: true
          }}>
            {events.slice(0, 4).map(event => (
              <Event143 key={event.id} {...event} baseNameForRouting={baseNameForRouting}/>
            ))}
          </Flickity>
        </Grid>
      </GridWrap>
    );
  }
}

export default PopularOnWeek;
