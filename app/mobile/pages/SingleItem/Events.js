import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { EventDef } from '../../components/Event';
import { BilegoIconLoading } from '../../../theme/bilegoIcons';

const StyleGrid = styled(Grid)`
  > button{
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
`;
const SFab = styled(Fab)`
  width: calc(100% - 40px)!important;
  margin: 20px!important;
`;
const Title = styled(Typography)`
  margin-top: 10px!important;
  margin-left: 16px!important;
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
      item.events && item.events.length > 0
      ?
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title component="h5" variant="h5">События</Title>
        </Grid>
        <StyleGrid item xs={12} >
            {item.events.slice(0, this.count).map(event => (
              <EventDef key={event.id} {...event} baseNameForRouting={baseNameForRouting}/>
            ))}
          <NoSsr>
            {this.showButton &&
            <SFab onClick={this.loadMore} variant="extended" aria-label="load">
              {BilegoIconLoading} Показать ещё
            </SFab>
            }
          </NoSsr>
        </StyleGrid>
      </Grid>
      :
      null
    )
  }
}

export default Events;
