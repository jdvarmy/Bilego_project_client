import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import { Event430, Event200 } from '../../components/Event';
import BlockHeaderText from '../../components/BlockHeaderText';
import Next from '../../components/Next';
import { BilegoIconRightArrow } from '../../theme/BilegoIcons';
import style from '../../theme/style';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrapLarge = styled(Card)``;
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
class EventsSoon extends Component{
  eventsArray;
  event430 = undefined;

  getEvent430 = () => {
    this.eventsArray.map((event, k)=>{
      if(event.media_event)
        return this.eventsArray.splice(k, 1);
    });

    return this.eventsArray.splice(0, 1);
  };

  render() {
    const {pageStore:{eventsSoon}, globalStore:{baseNameForRouting}} = this.props;

    this.eventsArray = eventsSoon.length > 0 ? eventsSoon.map(e=>({...e})) : [];
    this.event430 = this.getEvent430();

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <SBlockHeaderText>
            <Link to={`/${baseNameForRouting}/events`}>
              Ближайшие события
              <Next ariaLabel="buy">
                {BilegoIconRightArrow} Смотреть все
              </Next>
            </Link>
          </SBlockHeaderText>
        </Grid>
        <Grid item xs={4}>
          <CardWrapLarge>
            <Event430 {...this.event430[0]} baseNameForRouting={baseNameForRouting}/>
          </CardWrapLarge>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CardWrap>
                <Event200 {...this.eventsArray[0]} baseNameForRouting={baseNameForRouting}/>
              </CardWrap>
              <CardWrap>
                <Event200 {...this.eventsArray[1]} baseNameForRouting={baseNameForRouting}/>
              </CardWrap>
            </Grid>
            <Grid item xs={6}>
              <CardWrap>
                <Event200 {...this.eventsArray[3]} baseNameForRouting={baseNameForRouting}/>
              </CardWrap>
              <CardWrap>
                <Event200 {...this.eventsArray[4]} baseNameForRouting={baseNameForRouting}/>
              </CardWrap>
            </Grid>
          </Grid>
        </Grid>
      </GridWrap>
    );
  }
}

export default EventsSoon;
