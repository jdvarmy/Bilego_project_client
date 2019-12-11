import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import EventsList from '../EventsList';
import BlockHeaderText from '../../../components/BlockHeaderText';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;

@inject('pageStore')
class Festivals extends Component{
  render(){
    return(
      <GridWrap container spacing={4}>
        <Grid item xs={12}><BlockHeaderText>Фестивали</BlockHeaderText></Grid>
        <Grid item xs={12}>
          <EventsList/>
        </Grid>
      </GridWrap>
    );
  }
}

export default Festivals;