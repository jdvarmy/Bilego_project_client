import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import BlockHeaderText from '../../components/BlockHeaderText';
import { Event200 } from '../../components/Event';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;

@inject('singleItemStore', 'globalStore')
@observer
class Events extends Component{
  @observable count = 6;
  @observable showLoadBtn = false;

  @action loadMore = () => {

  };

  @action componentDidMount() {
    this.showLoadBtn = this.props.singleItemStore.item.events ? this.props.singleItemStore.item.events.length > this.count : false;

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
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {item.events.map(event => (
              <Grid key={event.id} item xs={4}>
                <CardWrap>
                  <Event200 {...event} baseNameForRouting={baseNameForRouting}/>
                </CardWrap>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </GridWrap>
      :
      null
    )
  }
}

export default Events;
