import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import style from '../../theme/style';
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
const SBlockHeaderText = styled(BlockHeaderText)`
  a{
    color: ${style.$black};
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;

@inject('pageStore', 'globalStore')
@observer
class Concerts extends Component{
  render() {
    const {pageStore:{eventsConcerts, isLoading}, globalStore:{baseNameForRouting}} = this.props;
    const events = eventsConcerts && eventsConcerts.length>0 ? eventsConcerts : [{id:0},{id:1},{id:2}];

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <SBlockHeaderText>
            <Link to={`/${baseNameForRouting}/events/concerts`}>
              Концерты
              <Next ariaLabel="buy">
                {BilegoIconRightArrow} Смотреть все
              </Next>
            </Link>
          </SBlockHeaderText>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
          {isLoading && eventsConcerts.length <= 0
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

export default Concerts;
