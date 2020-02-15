import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Event300 } from '../../components/Event';
import { BilegoIconRightArrow } from '../../theme/bilegoIcons';
import { LoadingForEventsWith300 } from '../../components/LoadingsTemplate';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;
const STypography = styled(Typography)`
  svg{
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  :hover{
    svg{
      transform: translate(15px, 0);
    }
  }
`;

@inject('pageStore', 'globalStore')
@observer
class EventsSoon extends Component{
  render() {
    const {pageStore:{eventsHot, isLoading}, globalStore:{baseNameForRouting}} = this.props;
    const events = eventsHot && eventsHot.length>0 ? eventsHot : [{id:0},{id:1},{id:2}];

    return (
      <GridWrap container spacing={4} className="bilego-dark">
        <Grid item xs={12}>
          <STypography component="h3" variant="h3">
            <Link to={`/${baseNameForRouting}/search?cat=pop`}>
              Популярные события {BilegoIconRightArrow}
            </Link>
          </STypography>
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
