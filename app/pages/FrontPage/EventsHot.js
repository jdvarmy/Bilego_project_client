import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Event300 } from '../../components/Event';
import { BilegoIconRightArrow } from '../../theme/bilegoIcons';
import { LoadingForEventsWith300 } from '../../components/LoadingsTemplate';
import BlockHeaderTextH3 from '../../components/BlockHeaderTextH3';

import css from '../../theme/style';

const GridWrap = styled(Grid)`
  padding: ${css.sizes.lg};
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: ${css.sizes.xl};
`;

@inject('pageStore', 'globalStore')
@observer
class EventsSoon extends Component{
  render() {
    const {pageStore:{eventsHot, isLoading}, globalStore:{baseNameForRouting}} = this.props;
    const events = eventsHot && eventsHot.length>0 ? eventsHot : [{id:0},{id:1},{id:2}];

    return (
      <GridWrap container spacing={4} className="bilego-dark">
        {isLoading && eventsHot.length <= 0
          ? <LoadingForEventsWith300 />
          :
          <React.Fragment>
          <Grid item xs={12}>
            <BlockHeaderTextH3>
              <Link to={`/${baseNameForRouting}/search?cat=pop`}>
                Популярные события {BilegoIconRightArrow}
              </Link>
            </BlockHeaderTextH3>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {events.slice(0, 3).map(event=>(
                <Grid key={event.id} item xs={4}>
                  <CardWrap>
                    <Event300 {...event} baseNameForRouting={baseNameForRouting}/>
                  </CardWrap>
                </Grid>
              ))}
            </Grid>
          </Grid>
          </React.Fragment>
        }
      </GridWrap>
    );
  }
}

export default EventsSoon;
