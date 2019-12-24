import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import BlockHeaderText from '../../components/BlockHeaderText';
import { Event200 } from '../../components/Event';
import {BilegoIconLoading} from "../../theme/bilegoIcons";
import NoSsr from "@material-ui/core/NoSsr";
import Fab from "@material-ui/core/Fab";

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const StyleGrid = styled(Grid)`
  text-align: center;
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;
const SFab = styled(Fab)`
  margin-top: 40px!important;
  transition: opacity .2s ease 0s;
`;

@inject('singleItemStore', 'globalStore')
@observer
class Events extends Component{
  @observable count = 6;
  @observable showButton = false;

  @action loadMore = () => {
    this.count += 6;
    this.showButton = this.props.singleItemStore.item.events ? this.props.singleItemStore.item.events.length > this.count : false;
  };

  @action componentDidMount() {
    this.showButton = this.props.singleItemStore.item.events ? this.props.singleItemStore.item.events.length > this.count : false;

  }

  render() {
    const {singleItemStore:{item}, globalStore:{baseNameForRouting}} = this.props;

    return (
      item.events
      ?
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <BlockHeaderText>События</BlockHeaderText>
        </Grid>
        <StyleGrid item xs={12} >
          <Grid container spacing={4}>
            {item.events.slice(0, this.count).map(event => (
              <Grid key={event.id} item xs={4}>
                <CardWrap>
                  <Event200 {...event} baseNameForRouting={baseNameForRouting}/>
                </CardWrap>
              </Grid>
            ))}
          </Grid>
          <NoSsr>
            {this.showButton &&
            <SFab onClick={this.loadMore} variant="extended" aria-label="load" style={{opacity: `${p=>p.loading ? 0 : 1}`}}>
              {BilegoIconLoading} Загрузить ещё
            </SFab>}
          </NoSsr>
        </StyleGrid>
      </GridWrap>
      :
      null
    )
  }
}

export default Events;
